import React from 'react';
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ChoosenDish } from './chosenDish.tsx';
import { OneRestaurant } from './oneRestaurant.tsx';
import { AllRestaurant } from './allRestaurants.tsx';
import '../../../css/restaurant.css';

export function RestaurantPage() {
      let restaurant = useRouteMatch();
      return  <div className="restaurant_page">
         <Switch>
            <Route path={`${restaurant.path}/dish/:dish_id`}>
              <ChoosenDish />
             </Route>
            <Route path={`${restaurant.path}/:restaurant_id`}>
              <OneRestaurant />
            </Route>
            <Route path={`${restaurant.path}`}>
              <AllRestaurant />
            </Route>
         </Switch>
      </div>;
           
      
}