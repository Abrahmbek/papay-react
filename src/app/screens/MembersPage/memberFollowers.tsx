import {  Box, Stack } from "@mui/material";
import React, {  useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";


const followers =[
  {mb_nick: "usman", following: true},
  {mb_nick: "John", following: false},
  {mb_nick: "Sam", following: true},
  {mb_nick: "Alex", following: true},
];

export function MemberFollowers(props: any) {
      return (
       
        <Stack>
          {followers.map((follower) =>{
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
                  <span className="name_text">{follower.mb_nick}</span>
                 </div>
                <Stack className="btn_follow">
                 {props.actions_enabled &&
                 (follower.following? (
                  <Button
                  className="following-already"
                  style={{
                    background: "#68C5CB",
                        color: "#ffffff",
                          borderRadius: "50px",
                         marginTop: "18px",
                         width: "160px",
                   }}
                  >
                   FOLLOWING
                  </Button>
                 ) : (
                  <Button
                  variant={"contained"}
                  startIcon={
                    <img 
                     src="/icons/Group.svg" alt=""
                     style={{ width: "40px"}}
                     />
                  }
                  className="follow_btn"
                  >
                     Follow Back
                  </Button>
                 ))}
                 </Stack>
               </Box>
            );
          })}
        </Stack>
      
      );
}