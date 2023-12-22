import React, { useEffect } from 'react';
import { Container } from "@mui/material";
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
import { setTopRestaurants} from "../../screens/HomePage/slice.ts";
import {retrieveTopRestaurants} from "../../screens/HomePage/selector.ts";
import {Restaurant} from "../../../types/user.ts";

/** REDUX Slice */
const actionDispatch = (dispach: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispach(setTopRestaurants(data)),
});

/** REDUX SELECTOR */
const topRestaurantRetriever = createSelector (
  retrieveTopRestaurants,
  (topRestaurants) =>({
    topRestaurants,
  })
);

export function HomePage() {

/** INITIALIZATION */
 const {setTopRestaurants} = actionDispatch(useDispatch());
 const { topRestaurants } = useSelector( topRestaurantRetriever);
 
useEffect(() => {

  //backend data request => data
 
  setTopRestaurants([]);

}, []);

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