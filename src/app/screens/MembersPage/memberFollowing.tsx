import {  Box, Stack } from "@mui/material";
import React, {  useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";


const following =[
  {mb_nick: "usman"},
  {mb_nick: "John"},
  {mb_nick: "Sam"},
  {mb_nick: "Alen"},
];

export function MemberFollowing(props: any) {
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