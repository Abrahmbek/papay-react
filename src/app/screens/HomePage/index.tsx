import React, { useEffect } from 'react';
//import { Container } from "@mui/material";
import { Statistics } from './statistics.tsx';
import { TopRestaurants } from './topRestaurants.tsx';
import { BestRestaurants } from './bestRestaurants.tsx';
import { BestDishes } from './bestDishes.tsx';
import { Advertisements } from './advertisements.tsx';
import { Events } from './events.tsx';
import { Recommendations} from './recommendations.tsx';
import '../../../css/home.css';

// REDUX
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import { setBestRestaurants, setTopRestaurants} from "../../screens/HomePage/slice.ts";
import {retrieveTopRestaurants} from "../../screens/HomePage/selector.ts";
import {Restaurant} from "../../../types/user.ts";
import RestaurantApiService from '../../apiServices/restaurantApiService.ts';

/** REDUX Slice */
const actionDispatch = (dispach: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispach(setTopRestaurants(data)),
  setBestRestaurants: (data: Restaurant[]) => dispach(setBestRestaurants(data)),
});



export function HomePage() {

/** INITIALIZATION */
 const {setTopRestaurants, setBestRestaurants} = actionDispatch(useDispatch());

 
useEffect(() => {

  //backend data request => data
 const restaurantService = new RestaurantApiService();
 restaurantService.getTopRestaurants().then(data =>{
  setTopRestaurants(data);

 })
 .catch(err => console.log(err));
 
 restaurantService.getRestaurants({page: 1, limit: 4, order: 'mb_point'}).then(data =>{
  setBestRestaurants(data)
 }).catch(err => console.log(err));

},[]);

      return <div className='homepage'>
          <Statistics/>
          <TopRestaurants/>
          <BestRestaurants/>
          <BestDishes/>
          <Advertisements/>
          <Events/>
          <Recommendations/>
            </div>;
      
}