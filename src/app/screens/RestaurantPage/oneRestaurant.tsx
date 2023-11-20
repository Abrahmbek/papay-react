import React from 'react';
import { Box, Button, Container, Stack } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide} from "swiper/react";
import  Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import  Favorite  from '@mui/icons-material/Favorite';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Badge from '@mui/material/Badge';




const restaurant_list = Array.from(Array(10).keys());

const product_list = Array.from(Array(10).keys());
export function OneRestaurant() {

  return (
  <div className='single_resto'>
    <Container >
       <Stack flexDirection={"column"} alignItems={"center"}>
        <Stack className={"avatar_big_box"}>
          <Box className={"top_text"}>
            <p>Texas De Brazil Restaurant</p>
            <Box className={"single_search_big_box"} >
              <form className={"single_search_form"} action={""} method={""}>
                <input 
                type="search" 
                className={"single_searchInput"}
                name={"Single_resSearch"}
                placeholder={"Qidiruv"}
                  />
                  <Button 
                   className={"Single_button_search"}
                   variant= "contained"
                   endIcon={<SearchIcon />}
                   >
                  Izlash
                  </Button>
              </form>
             </Box> 
          </Box>
        </Stack>

        <Stack
          style={{ width: "100%", display: "flex"}}
          flexDirection={"row"}
          sx={{ mt: "35px"}}
          >
          <Box className={"prev_btn restaurant_prev"}>
            <ArrowBackIosNewIcon 
              sx={{ fontsize: 40}}
              style={{color: "white"}}
            />
            
          </Box>

          <Swiper 
                className={"restaurant_avatars_wrapper"}
                slidesPerView={7}
                centeredSlides={false}
                spaceBetween={30}
                navigation={{
                  nextEl: ".restaurant_next",
                  prevEl: ".restaurant_prev",
                }}
               
              >
                {restaurant_list.map((ele, index) => {
                  return (
                    <SwiperSlide 
                      style={{cursor: "poiter"}}
                      key={index}
                     className={"restaurant_avatars"}
                     >
                      <img src={"/restaurant/boyin_food.jpg"}/>
                       <span>KFS</span>
                    </SwiperSlide>
                    );
                   })}
             </Swiper>
             <Box 
             className= {"next_btn restaurant_next"}
             style={{color: "white"}}
             >
               <ArrowForwardIosIcon 
              sx={{ fontsize: 40}}
               />
             </Box>
        </Stack>

        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"flex-end"}
          width={"90%"}
          sx={{mt: "65px"}}
          >
           <Box className={"dishs_filter_box"}>
            <Button variant={"contained"} color="secondary">
              new
            </Button>
            <Button variant={"contained"} color="secondary">
              price
            </Button>
            <Button variant={"contained"} color="secondary">
              likes
            </Button>
            <Button variant={"contained"} color="secondary">
              views
            </Button>
           </Box>
        </Stack>
        <Stack 
        style={{width: "100%", display: "flex", minHeight: "600px"}}
          flexDirection={"row"}
          >

       
        <Stack className={"dish_category_box"}>
            <div className={"dish_category_main"} >
            <Button variant={"contained"} color="secondary">
              boshqa
            </Button>
            <Button variant={"contained"} color="secondary">
              desert
            </Button>
            <Button variant={"contained"} color="secondary">
              ichimlik
            </Button>
            <Button variant={"contained"} color="secondary">
              salad
            </Button>
            <Button variant={"contained"} color="secondary">
              ovqatlar
            </Button>
          </div>
        </Stack>

        <Stack className={"dish_wrapper"}>
        { product_list.map((ele, index) => {
          const size_volume ="normal size";

          return (
            <Box className={"dish_box"}>
              <Box 
               className={"dish_img"}
               sx={{
                backgroundImage: `url("/restaurant/boyin_food.jpg")`,
               }}
               >
                <div className={"dish_sale"}>{size_volume} </div>
                 <Button 
                 className={"like_view_btn"}
                 style={{left: "36px"}}
                 >
                 <Badge badgeContent={8} color="primary">
                  <Checkbox 
                    icon={<FavoriteBorder style={{color: "white"}} />}
                    id={`${index}`}
                    checkedIcon={<Favorite style={{ color: "red"}} />}
                    checked={true}
                  />
                 </Badge>
                </Button>
                <Button className={"views_btn"}>
                  <img 
                  src={"/public/icons/shopping-cart.svg"}
                  style={{display: "flex"}} 
                   />
                </Button>
                <Button 
                  className={"like_view_btn"}
                  style={{right: "36px"}}
                 >
                  <Badge badgeContent={1000} color="primary">
                    <Checkbox
                      icon={
                        <RemoveRedEyeIcon style={{color: "white"}}/>
                      }
                    />
                  </Badge>
                </Button>
              </Box>
               <Box className={"dish_desc"}>
                 <span className={"dish_title_text"}>Mazali taom</span>
                 <div className={"dish_desc_text"}>
                    <MonetizationOnIcon />7
                 </div>
               </Box>
              </Box>
            );
          })}
         </Stack>
       </Stack>
       </Stack>
    </Container>
     
     <div className={"review_for_restaurant"}>
      <Container
       sx={{ mt: "100px"}}
       style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
       }}
      >
      <Box className={"category_title"}> Oshhona haqida fikrlar </Box>
         <Stack 
         flexDirection={"row"}
         display={"flex"}
         justifyContent={"space-between"}
         width={"100%"}
         >
          {Array.from(Array(4).keys()).map((ele, index) => {
            return (
              <Box className={"review_box"} key={index}>
                <Box display={"flex"} justifyContent={"center"}>   
                  <img src={"/auth/cute_girl.jpg"} 
                   className={"review_img"}
                   />
                </Box>
                <span className={"review_name"}>Rayhon Asadova</span>
                <span className={"review_prof"}>Foydalanuvchi</span>
                <p className={"review_desc"}>
                  Menga bu oshhona taomlari juda yoqadi.
                  Hammaga Tavsiya qilaman!!
                </p>
                <div className={"review_stars"}>
                  <StarIcon style={{ color: "#F2BD57"}} />
                  <StarIcon style={{ color: "#F2BD57"}} />
                  <StarIcon style={{ color: "#F2BD57"}} />
                  <StarIcon style={{ color: "whitesmoke"}} />
                  <StarIcon style={{ color: "whitesmoke"}} />
                </div>
              </Box>
            );
          })}
         </Stack>
      </Container>
     </div>

      <Container className={"member_reviews"}>
        <Box className={"category_title"}>Oshhona Haqida</Box>
        <Stack
          display={"flex"}
           flexDirection={"row"}
           width={"90%"}
           sx={{mt: "70px"}}
          >
          <Box
             className={"about_left"}
            sx={{
              backgroundImage: `url("/restaurant/boyin_food.jpg")`,
            }}
            >
              <div className={"about_left_desc"}>
                <span>KFS</span>
                <p>Eng mazali oshhona</p>
              </div>
          </Box>
          <Box className={"about_right"}>
          {Array.from(Array(4).keys()).map((ele, index) => {
            return (
              <Box display={"flex"} flexDirection={"row"} key={index}>
                <div className={"about_rigth_img"}></div>
                <div className={"about_right_desc"}>
                  <span>Bizning Mohir Oshpazlarimiz</span>
                  <p>Bizning Oshpazlarimiz Chet Elada malaka oshirib kelishdi</p>
                </div>
               </Box>
              );
           })}
          </Box>
        </Stack>
       
       <Stack
         sx={{mt: "60px"}}
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
         }}
       >
        <Box className={"category_title"}>Oshhona Manzili</Box>
          <iframe 
          style={{marginTop: "60px"}}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.8162804798862!2d127.11749407481565!3d35.83001977351638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35703ca8628865a7%3A0x6f839c441f3600f9!2sBurger%20King!5e0!3m2!1sru!2skr!4v1700493460281!5m2!1sru!2skr"
           height="500"
           referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
       </Stack>

      </Container>
      
  </div>
  );
}