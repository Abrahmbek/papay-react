import React from 'react';
import { Container } from "@mui/material";
import { Statistics } from './statistics.tsx';
import { TopRestaurants } from './topRestaurants.tsx';
import { BestRestaurants } from './bestRestaurants.tsx';
import { BestDishes } from './bestDishes.tsx';
import { Advertisements } from './advertisements.tsx';
import { Events } from './events.tsx';
import { Recommendations} from './recommendations.tsx';
import '../../../css/home.css';


export function HomePage() {
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