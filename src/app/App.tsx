import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import AuthanticationModal from "./components/auth/index.tsx";
import { serverApi } from '../lib/config.ts';
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from '../lib/sweetAlert.ts';
import { Definer } from '../lib/Definer.ts';
import MemberApiService from './apiServices/memberApiService.ts';
//import "../app/apiServices/verify.ts";
import { Member } from '../types/user.ts';
import { CartItem } from '../types/others.ts';
import { Product } from '../types/product.ts';

function App() {

  /**INITIALIZATIONS */
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null);

  const [path, SetPath] = useState();
  const manin_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
 
  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart:  CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

  useEffect(() =>{
  console.log("==== useEfeect: App ===");
  const memberDataJson: any = localStorage.getItem("member_data")
  ? localStorage.getItem("member_data")
  : null;
  const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
  if(member_data) {
    member_data.mb_image = member_data.mb_image 
    ? `${serverApi}/${member_data.mb_image}`
    :"/public/auth/default_user1.svg";
    setVerifiedMemberData(member_data);
  }
  },[signUpOpen, loginOpen]);

  /**HANDLERS */
  const handleSignUpOpen = () =>  setSignUpOpen(true);
  
  const handleSignUpClose = () =>   setSignUpOpen(false);
  
  const handleLoginOpen = () =>   setLoginOpen(true);

  const handleLoginClose = () =>   setLoginOpen(false);
  const handleLogOutClick =( event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
};

const handleCloseLogOut =( event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
};

const handleLogoutRequest = async () => {
  try {
    const memberApiService = new MemberApiService();
    await memberApiService.logOutRequest();
    await sweetTopSmallSuccessAlert("success", 700, true);
    localStorage.removeItem("member_data");
  } catch(err: any) {
    console.log(err);
    sweetFailureProvider(Definer.general_err1);
  }
}
  
const onAdd = (product: Product) => {
  const exist : any = cartItems.find((item: CartItem) => 
  item._id===product._id
);

  if( exist) {
     const cart_updated = cartItems.map((item: CartItem) =>
     item._id===product._id
     ? {...exist, quantity: exist.quantity + 1}
     : item
     );
  
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  }else {
    const new_item: CartItem = {
      _id: product._id,
      quantity: 1,
      name: product.product_name,
      price: product.product_price,
      image: product.product_images[0]
    };
    const cart_updated = [...cartItems, {...new_item}];
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  }
};
const onRemove = (item: CartItem) => {
  const item_data: any = cartItems.find((ele: CartItem) => ele._id === item._id);
  
  if( item_data.quantity === 1) {
  const  cart_updated = cartItems.filter((ele: CartItem) => ele._id !== item._id
  );
  
  setCartItems(cart_updated);
  localStorage.setItem("cart_data", JSON.stringify(cart_updated));

  }else {
   const cart_updated = cartItems.map((ele: CartItem) => 
   ele._id === item._id
   ? {...item_data, quantity: item_data.quantity - 1}
    : ele
   );
   setCartItems(cart_updated);
   localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  }
};
const onDelete = (item: CartItem) => {
  const  cart_updated = cartItems.filter((ele: CartItem) => ele._id !== item._id
  );
  
  setCartItems(cart_updated);
  localStorage.setItem("cart_data", JSON.stringify(cart_updated));
};
const onDeleteAll = () => {
  setCartItems([]);
  localStorage.removeItem("cart_data");
};
  return (
    <Router>

     {manin_path === "/" ? (
      <NavbarHome 
      SetPath={SetPath}
      handleLoginOpen={handleLoginOpen}
      handleSignUpOpen={handleSignUpOpen}
      anchorEl={anchorEl}
      open={open}
      handleLogOutClick={handleLogOutClick}
      handleCloseLogOut={handleCloseLogOut}
      handleLogoutRequest={handleLogoutRequest}
      verifiedMemberData={verifiedMemberData}
      cartItems={cartItems}
      onAdd={onAdd}
      onRemove={ onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setOrderRebuild={setOrderRebuild}
      />
     ) : manin_path.includes("/restaurant") ? (
      <NavbarRestaurant 
      SetPath={SetPath}
      handleLoginOpen={handleLoginOpen}
      handleSignUpOpen={handleSignUpOpen}
      anchorEl={anchorEl}
      open={open}
      handleLogOutClick={handleLogOutClick}
      handleCloseLogOut={handleCloseLogOut}
      handleLogoutRequest={handleLogoutRequest}
      verifiedMemberData={verifiedMemberData}
      cartItems={cartItems}
      onAdd={onAdd}
      onRemove={ onRemove}
      onDelete={onDelete}
      onDeleteAll={onDeleteAll}
      setOrderRebuild={setOrderRebuild}
      /> 
     ) : (
      <NavbarOthers
       SetPath={SetPath}
       handleLoginOpen={handleLoginOpen}
       handleSignUpOpen={handleSignUpOpen}
       anchorEl={anchorEl}
      open={open}
      handleLogOutClick={handleLogOutClick}
      handleCloseLogOut={handleCloseLogOut}
      handleLogoutRequest={handleLogoutRequest}
       verifiedMemberData={verifiedMemberData}
       cartItems={cartItems}
       onAdd={onAdd}
       onRemove={ onRemove}
       onDelete={onDelete}
       onDeleteAll={onDeleteAll}
       setOrderRebuild={setOrderRebuild}
        />
     )}

   
      
      <Switch>
        <Route path="/restaurant">
          <RestaurantPage onAdd= {onAdd}/>
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage orderRebuild={orderRebuild} setOrderRebuild={setOrderRebuild}
          verifiedMemberData={verifiedMemberData}/>
        </Route>
        <Route path="/member-page">
          <MembersPage verifiedMemberData={verifiedMemberData}/>
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
     <AuthanticationModal
      loginOpen={loginOpen}
      handleLoginOpen={handleLoginOpen}
      handleLoginClose={handleLoginClose}
      signUpOpen = {signUpOpen}
      handleSignUpOpen={handleSignUpOpen}
      handleSignUpClose={handleSignUpClose}
     />
  </Router>
  );
}

export default App;


