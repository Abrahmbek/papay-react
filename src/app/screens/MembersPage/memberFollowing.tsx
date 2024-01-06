import {  Box, Stack } from "@mui/material";
import React, {  useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import { setMemeberFollowings} from "./slice.ts"
import { Dispatch } from '@reduxjs/toolkit';
import {retrieveMemeberFollowings } from './selector.ts';
import {  Following } from "../../../types/follow.ts";




/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setMemeberFollowings: (data: Following[]) => dispatch( setMemeberFollowings(data)),

 
});
/** REDUX SELECTOR */
const memeberFollowingsRetriever = createSelector (
  retrieveMemeberFollowings,
  (memeberFollowings) =>({
    memeberFollowings,
  })
);


const following =[
  {mb_nick: "usman"},
  {mb_nick: "John"},
  {mb_nick: "Sam"},
  {mb_nick: "Alen"},
];

export function MemberFollowing(props: any) {

       /**INITIALIZATION */

       const {setMemeberFollowings} = actionDispatch(useDispatch());
       const {memeberFollowings} = useSelector( memeberFollowingsRetriever);
      return (
        <Stack>
          {following.map((following) =>{
            const image_url ="/icons/odamcha.svg";
            return (
               <Box className="follow_box">
                 <Avatar alt="" src={image_url} sx={{ width: 89, height: 89}} />
                 <div
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "25px",
                    height: "85%",
                  }}
                 >
                  <span className="username_text">USER</span>
                  <span className="name_text">{following.mb_nick}</span>
                 </div>
                 {props.actions_enabled && (
                  
                  <Button
                  variant={"contained"}
                  startIcon={
                    <img 
                     src="/icons/User.svg" alt=""
                     style={{ width: "40px", marginLeft: "16px"}}
                     />
                  }
                  className="follow_cancel_btn"
                  >
                  Bekor Qilish
                  </Button>
                 )}
               </Box>
            );
          })}
        </Stack>
      );
}