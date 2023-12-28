import React, { useEffect } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import PaginationItem from "@mui/material/PaginationItem";
import Pagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import  Favorite  from '@mui/icons-material/Favorite';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CallIcon from '@mui/icons-material/Call';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  FavoriteIcon  from '@mui/icons-material/Favorite';
import { Box, Button, Container, Stack } from '@mui/material';
// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveTargetRestaurants} from "../../screens/RestaurantPage/selector.ts";
import { Restaurant } from '../../../types/user.ts';
import { Dispatch } from '@reduxjs/toolkit';
import {setTargetRestaurants} from "../../screens/RestaurantPage/slice.ts";

const order_list = Array.from(Array(8).keys());

/** REDUX Slice */
const actionDispatch = (dispach: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) => dispach(setTargetRestaurants(data)),
 
});


/** REDUX SELECTOR */
const targetRestaurantRetriever = createSelector (
  retrieveTargetRestaurants,
  (targetRestaurants) =>({
    targetRestaurants,
  })
);
export function AllRestaurant() {

     /**INITIALIZATIONS */
     const {setTargetRestaurants} = actionDispatch(useDispatch());
     const {targetRestaurants} = useSelector(targetRestaurantRetriever);


     useEffect (()  => {

     },[]);
  return (
  <div className="all_restaurant">
    <Container>
      <Stack flexDirection={"column"} alignItems={"center"}>
        <Box className={"fil_search_box"}>
          <Box className={"fil_box"}>
            <a>Zo'r</a>
            <a>Mashhur</a>
            <a>Trendagi</a>
            <a>Yangi</a>
          </Box>
          <Box className={"search_big_box"}>
            <form className={"search_form"} action={""} method={""}>
             <input 
             type={"Search"}
             className={"searchInput"}
             name={"resSearch"}
             placeholder={"Qidiruv"}
                  />
             <Button className={"button_search"}
             variant="contained"
             endIcon={<SearchIcon />}
             >
                  Izlash
             </Button>
            </form>
          </Box>
        </Box>
        <Stack className={"all_res_box"}>
         <CssVarsProvider>
            {order_list.map(ele => {
                  return (
                        <Card
                        variant="outlined"
                        sx={{
                          minHeight: 410,
                          minWidth: 290,
                          mx: "17px",
                          my: "20px",
                        }}
                       >
                         <CardOverflow>
                           <AspectRatio ratio="1">
                              <img src="/restaurant/pizzar_resto.jpg" alt="" />
                           </AspectRatio>
                           <IconButton
                           aria-label='like minimal photography'
                           size="md"
                           variant="solid"
                           color="neutral"
                           onClick={(e) => {
                              e.stopPropagation();
                           }}
                           sx={{
                              position: "absolute",
                              zIndex: 2,
                              borderRadius: "50%",
                              right: "1rem",
                              bottom: 0,
                             transform: "translateY(50%)",
                           color: "rgba(0,0,0,.4)",
                           }}
                           >
                           <Favorite style={{fill: "white"}} />
            
                           </IconButton>
                         </CardOverflow>
                         <Typography level="h2" sx={{ fontSize: "md", mt: 2}}>
                           Pizzar
                          </Typography>
                          <Typography level='body-sm' sx={{ mt: 0.5, mb:2}}>
                         <Link 
                          href=""
                          startDecorator={<LocationOnRoundedIcon />}
                           textColor="neutral.700"
                           >
                          Tashkent, Yunus Abad 4-1
                          </Link>
                        </Typography>
                         <Typography level='body-sm' sx={{ mt: 0.5, mb:2}}>
                          <Link 
                           href=""
                          startDecorator={<CallIcon />}
                          textColor="neutral.700"
                         >
                        01023729395
                        </Link>
                       </Typography>
                       <CardOverflow 
                       variant="soft"
                          sx={{
                           display: "flex",
                           flexDirection: "row",
                          gap: 1.5,
                          py: 1.5,
                          px: 'var-(--Card-padding)',
                          borderTop: "1px solid", 
                          borderColor: "neutral.outlineBorder",
                           bgcolor: "background.level1",   
                            }}
                         >
                                   
                        <Typography 
                         level="body-sm"
                         sx={{
                         fontWeight: "md",
                         color: "text.secondary",
                        alignItems: "center",
                         display: "flex",
                         }}
                         >
                          100{""}
                         <VisibilityIcon sx={{ fontsize: 20, marginLeft: "5px"}} />
                        </Typography>
                          <Box sx={{ width: 2, bgcolor: "divider"}}/>
                              <Typography
                                 sx={{
                                 fontWeight: "md",
                                color: "text.secondary",
                                 alignItems: "center",
                                 display: "flex",
                               }}
                            >
                            <div>500</div>
                           <FavoriteIcon sx={{ fontsize: 20, marginLeft: "5px"}} /> 
                           </Typography>
                          </CardOverflow>           
                        </Card>
                  );
            })}
          
         </CssVarsProvider>
        </Stack>
        <Stack className={"bottom_box"}>
          <img className={"line_img"} src={"/restaurant/line_group.svg"} alt="" />
          <Pagination
           count={3}
           page={1}
           renderItem={(item) => {
            <PaginationItem
              components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
              }}
              {...item}
              color={"secondary"}
             />
           }}
          />
              <img className={"line_img_two"} src={"/restaurant/line_two.svg"} alt="" />
        </Stack>
      </Stack>
    </Container>
   </div>
   );
}

function seTargetRestaurants(data: Restaurant[]): any {
  throw new Error('Function not implemented.');
}
