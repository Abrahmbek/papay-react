import React, { useEffect, useState} from 'react';
import { Box,  Container, Stack } from '@mui/material';
import {Swiper,  SwiperSlide } from 'swiper/react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Marginer from '../../components/marginer/index.tsx';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs } from 'swiper';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import  Favorite  from '@mui/icons-material/Favorite';
import  Checkbox from '@mui/material/Checkbox';
import { Definer } from '../../../lib/Definer.ts';
import assert from 'assert';
// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import { 
  retrieveChosenProduct,
  retrieveChosenRestaurants } from "../../screens/RestaurantPage/selector.ts";

import { Dispatch } from '@reduxjs/toolkit';
import { setChosenProduct,setChosenRestaurant} from "../../screens/RestaurantPage/slice.ts";
import { useParams } from 'react-router-dom';
import { Restaurant } from '../../../types/user.ts';
import { Product } from '../../../types/product.ts';
import ProductApiService from '../../apiServices/productApiService.ts';
import RestaurantApiService from '../../apiServices/restaurantApiService.ts';
import { serverApi } from '../../../lib/config.ts';
import MemberApiService from '../../apiServices/memberApiService.ts';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert.ts';
import { verifiedMemberData } from '../../apiServices/verify.ts';



/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({

  setChosenRestaurant: (data: Restaurant[]) => dispatch(setChosenRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
 
});
/** REDUX SELECTOR */
const chosenProductRetriever = createSelector (
  retrieveChosenProduct,
  (chosenProduct) =>({
    chosenProduct,
  })
);
const chosenRestaurantRetriever = createSelector (
  retrieveChosenRestaurants,
  (chosenRestaurant) =>({
    chosenRestaurant,
  })
);

const chosen_list =Array.from(Array(3).keys());

export function ChoosenDish(props: any) {
     /**INITIALIZATIONS */

     const [productRebuild, setProductRebuild] = useState<Date>(new Date())
     let { dish_id } = useParams<{dish_id: string}>();
     const {setChosenProduct, setChosenRestaurant} = actionDispatch(useDispatch());
     const {chosenProduct} = useSelector(chosenProductRetriever);
     const {chosenRestaurant} = useSelector(chosenRestaurantRetriever);
  const label ={ inputProps:  { "aria-label": "Checkbox demo"} };

  const dishRelatedProcess = async () => {
    try {
   const productService = new ProductApiService();
   const product: Product = await productService.getChosenDish(dish_id);
   setChosenProduct(product);

   const restaurantService = new RestaurantApiService();
   const restaurant = await restaurantService.getChosenRestaurants(
    product.restaurant_mb_id
   );
   setChosenRestaurant(restaurant);
    }catch(err) {
  console.log(`dishRelatedProcess: ERROR`, err);
    }
  }

  useEffect(() => {
    dishRelatedProcess().then();
  },[productRebuild]);

    /**HANDLERS */

  const targetLikeProduct = async (e: any) => {
    try{ 
     assert.ok(verifiedMemberData, Definer.auth_err1);
 
     const memberService = new MemberApiService(), 
     like_result: any = await memberService.memberLikeTarget({
       like_ref_id: e.target.id,
       group_type: "product",
 
     });
     assert.ok(like_result, Definer.general_err1);
 
    
   await  sweetTopSmallSuccessAlert("success", 700, false);
  setProductRebuild(new Date());
    }catch(err: any) {
       console.log("targetLike, EROOR:", err);
       sweetErrorHandling(err).then();
    }
   }

 
  
  return (<div className="chosen_dish_page">
     <Container className="dish_container"
     sx={{display: "flex"}}
     >
       <Stack className="chosen_dish_slider">
         <Swiper 
         className="dish_swiper"
         loop={true}
         slidesPerView={chosenProduct?.product_images.length}
         freeMode={true}
         watchSlidesProgress={true}
         spaceBetween={10}
         navigation={true}
         modules={[FreeMode, Navigation, Thumbs]}
         >
        {chosenProduct?.product_images.map((ele: string) => {
             const image_path = `${serverApi}/${ele}`;
          return (
            <SwiperSlide>
              <img 
               style={{display: "flex", height: "100%"}}
              src= {image_path} alt=''
              />
            </SwiperSlide>
          );
        })}
         </Swiper>
        
         <Swiper
               className="dish_swiper_two"
               loop={true}
               spaceBetween={10}
               navigation={{
                nextEl: null,
            }}
            slidesPerView={3}
               modules={[FreeMode,Navigation, Thumbs]}

               
               >
                   {chosenProduct?.product_images.map((ele: string) => {
                        const image_path = `${serverApi}/${ele}`;
                     
                       
                       return (
                           <SwiperSlide>
                               <img style={{ width: "100%", height: "100%" }}
                               src={image_path} alt=''
                               />
                           </SwiperSlide>
                       );
                   })}

               </Swiper>
       </Stack>

       <Stack className={"chosen_dish_info_container"}>
        <Box className={"chosen_dish_info_box"}>
          <strong className={"dish_txt"}> {chosenProduct?.product_name}</strong>
           <span className={"resto_name"}>{chosenRestaurant?.mb_nick}</span>
           <Box className={"rating_box"}>
            <Rating  name="half-rating" defaultValue={3.5}precision={0.5}/>
             <div className={"evaluation_box"}>
                <div
                   style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                   }}
                   >
                    <Checkbox 
                      {...label}
                      icon={<FavoriteBorder /> }
                    checkedIcon={<Favorite style={{ color: "red"}} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    checked={chosenProduct?.me_liked &&
                    !!chosenProduct?.me_liked[0]?.my_favorite}
                    />
                     
                     <span>{chosenProduct?.product_likes}</span>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                <RemoveRedEyeIcon sx={{mr: "10px"}}/>
                <span>{chosenProduct?.product_views}</span>
                </div>
             </div>
           </Box>
           <p className={"dish_desc_info"}>  {chosenProduct?.product_description 
           ? chosenProduct?.product_description
          : "no description"} 
          </p>
           <Marginer 
            direction="horizontal"
            height='1'
            width="100%"
            bg="black"
           />
           <div className="dish_price_box">
            <span>Narxi:</span>
            <span>$ {chosenProduct?.product_price}</span>
           </div>
           <div className={"button_box"}>
              <Button variant="contained" 
               onClick={() => {
                props.onAdd(chosenProduct);
               }}
              >Savatga Qo'shish</Button>
           </div>
        </Box>
       </Stack>
     </Container>
  </div>
  );
}