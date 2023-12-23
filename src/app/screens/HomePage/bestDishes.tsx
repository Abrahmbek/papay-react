import { MonetizationOn } from '@mui/icons-material';
import { Box, Container, Stack } from '@mui/material';
//import { url } from 'inspector';
import React, {  useEffect } from 'react';
// REDUX
import { Dispatch } from '@reduxjs/toolkit';
import {  useSelector} from "react-redux";
import {createSelector} from "reselect";
import { serverApi } from '../../../lib/config.ts';
import { Product } from '../../../types/product.ts';
import { setTrendProducts } from './slice.ts';
import { useDispatch } from 'react-redux';
import ProductApiService from '../../apiServices/productApiService.ts';
import { retrieveTrendproducts } from './selector.ts';

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
 setTrendProducts: (data: Product[]) => dispach(setTrendProducts(data)),
});

/** REDUX SELECTOR */
const trendProductsRetriever = createSelector (
      retrieveTrendproducts,
      (trendProducts) =>({
        trendProducts,
      })
    );

export function BestDishes() {

      /**INITIALIZATION */

      const {setTrendProducts} = actionDispatch(useDispatch());
      const { trendProducts } = useSelector( trendProductsRetriever);
      useEffect(() => {
        const productService = new ProductApiService();
        productService.getTargetProducts({ order: "product_likes", page: 1, limit: 4})
        .then((data) =>{setTrendProducts(data)}) 
        .catch(err => console.log(err))
      }, []);
      return (
            <div className='best_dishes_frame'>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
         <Box className='category_title'>Trendagi Ovqatlar</Box>
            <Stack sx={{ mt: "43px"}} flexDirection={"row"}>
                  {trendProducts.map((product: Product) => {
               const image_path = `${serverApi}/${product.product_images[0]}`;
               const size_volume = product.product_collection === 'drink'
                  ? product.product_volume + "l" 
                  : product.product_size + "size";
                        return (
                              <Box className="dish_box">
                              <Stack className="dish_img"
                                   sx={{
                                   backgroundImage: `url(${image_path})`,
                                  }}
                               >
                               <div className={"dish_sale"}>{size_volume}</div>
                               <div className={'view_btn'}>
                               Batafsil Ko'rish
                               <img
                                     src={"/icons/Arrow.png"} alt=''
                                     style={{ marginLeft: "9px" }}
                                     />
                                     </div>
                               </Stack>
                                     <Stack className={"dish_desc"}>
                                     <span className={"dish_title_text"}>{product.product_name}</span>
                                     <span className={"dish_desc_text"}>
                                     <MonetizationOn />
                                           {product.product_price}
                                     </span>            
                              </Stack>
                           </Box>
                         
                        )
                  })}
              
           </Stack>
         </Stack>
      </Container>
   </div>
   );
}