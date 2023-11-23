import React, { useState} from 'react';
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

const chosen_list =Array.from(Array(3).keys());

export function ChoosenDish() {
 
  const label ={ inputProps:  { "aria-label": "Checkbox demo"} };
  
  return (<div className="chosen_dish_page">
     <Container className="dish_container"
     sx={{display: "flex"}}
     >
       <Stack className="chosen_dish_slider">
         <Swiper 
         className="dish_swiper"
         loop={true}
         spaceBetween={10}
         navigation={true}
         modules={[FreeMode, Navigation, Thumbs]}
         >
        {chosen_list.map((ele) => {
  
          return (
            <SwiperSlide>
              <img 
               style={{width: "100%", height: "100%"}}
              src="/restaurant/boyin_food.jpg"
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
                   {chosen_list.map((ele) => {
                       
                     
                       
                       return (
                           <SwiperSlide>
                               <img style={{ width: "100%", height: "100%" }}
                               src="/restaurant/boyin_food.jpg"
                               />
                           </SwiperSlide>
                       );
                   })}

               </Swiper>
       </Stack>

       <Stack className={"chosen_dish_info_container"}>
        <Box className={"chosen_dish_info_box"}>
          <strong className={"dish_txt"}> Sweet Burger</strong>
           <span className={"resto_name"}>Texas De Brazil</span>
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
                    checked={true}
                    />
                     
                     <span>98 ta</span>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                <RemoveRedEyeIcon sx={{mr: "10px"}}/>
                <span>100ta</span>
                </div>
             </div>
           </Box>
           <p className={"dish_desc_info"}>JMany desktop publishing packages and web page 
           editors now use Lorem Ipsum as their default model text, 
           and a search for 'lorem ipsum' will uncover many web sites still in their infancy.     </p>
           <Marginer 
            direction="horizontal"
            height='1'
            width="100%"
            bg="black"
           />
           <div className="dish_price_box">
            <span>Narxi</span>
            <span>$ 12</span>
           </div>
           <div className={"button_box"}>
              <Button variant="contained">Savatga Qo'shish</Button>
           </div>
        </Box>
       </Stack>
     </Container>
  </div>
  );
}