import React, { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

import '../css/App.css';
import '../css/navbar.css';

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
import { NavbarRestaurant } from './components/header/resatirant.tsx';
import { NavbarOthers } from './components/header/others.tsx';

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

      {/* <nav>
        <ul>
          <li>
            <Link to="/restaurant">RestaurantPage</Link>
          </li>
          <li>
            <Link to="/community">CommunityPage</Link>
          </li>
          <li>
            <Link to="/orders">OrderPage</Link>
          </li>
          <li>
            <Link to="/member-page">MemberPage</Link>
          </li>
          <li>
            <Link to="/help">HelpPage</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/">HomePage</Link>
          </li>
        </ul>
      </nav> */}

      
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
   
  </Router>
  );
}

export default App;


