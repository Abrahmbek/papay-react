import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import '../css/App.css';
import '../css/navbar.css';
import '../css/footer.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RestaurantPage } from './screens/RestaurantPage/index.tsx';
import { CommunityPage } from './screens/CommunityPage/index.tsx';
import { OrdersPage } from './screens/OrdersPage/index.tsx';
import { MembersPage } from './screens/MembersPage/index.tsx';
import { HelpPage } from './screens/HelpPage/index.tsx';
import { LoginPage } from './screens/LoginPage/index.tsx';
import { HomePage } from './screens/HomePage/index.tsx';
import { NavbarHome } from './components/header/index.tsx';
import { NavbarRestaurant } from './components/header/restaurant.tsx';
import { NavbarOthers } from './components/header/others.tsx';
import { Footer } from './components/footer/index.tsx';

function App() {
  const [path, SetPath] = useState();
  const manin_path = window.location.pathname;

  return (
    <Router>

     {manin_path === "/" ? (
      <NavbarHome SetPath={SetPath}/>
     ) : manin_path.includes("/restaurant") ? (
      <NavbarRestaurant SetPath={SetPath}/> 
     ) : (
      <NavbarOthers SetPath={SetPath} />
     )}

   
      
      <Switch>
        <Route path="/restaurant">
          <RestaurantPage/>
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <MembersPage/>
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

     <Footer />  
  </Router>
  );
}

export default App;


