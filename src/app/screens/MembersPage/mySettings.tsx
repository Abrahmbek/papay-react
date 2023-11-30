import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";


export function MySettings(props: any) {
      return (
      <Stack className="my_settings_page">
       <Box className="member_media_frame">
         <img src="/icons/odamcha.svg" 
         className="mb_image"
         style={{borderRadius: "50%"}}
         width={"100px"}
         height={"100px"}
         alt="" 
         />
         <div className="media-change_box">
            <span>Rasm Yuklash</span>
            <p>jpg, jpeg, png rasmlarni yuklay olasiz</p>
            <div className="up_del_box">
             <Button component="label" style={{minWidth: "0"}}>
                 <CloudDownloadIcon />
                 <input type="file" hidden />
               </Button>
            </div>
         </div>
       </Box>
       <Box className="input_frame">
          <div className="long_input">
              <label className="spec_label">ism</label>
              <input 
              className="spec_input mb_nick"
              type="text" 
              placeholder=" Zarina Nizommidinova"
              name="mb_nick"
              />
          </div>
       </Box>
       <Box className="input_frame">
          <div className="short_input">
              <label className="spec_label">Telefon Raqam</label>
              <input 
              className="spec_input mb_phone"
              type="text" 
              placeholder="01023729495"
              name="mb_nick"
              />
          </div>
          <div className="short_input">
              <label className="spec_label">Manzil</label>
              <input 
              className="spec_input mb_phone"
              type="text" 
              placeholder="Tashkent, chilonzor c kvartal"
              name="mb_address"
              />
          </div>
       </Box>
       <Box className="input_frame">
          <div className="long_input">
              <label className="spec_label">Malumot</label>
              <textarea
              className="spec_input mb_phone"
              placeholder="not found"
              name="mb_description"
              />
          </div>
       </Box>
       <Box display={"flex"} justifyContent={"flex-end"} sx={{mt: "25px"}}>
            <Button variant={"contained"}> Saqlash </Button>
       </Box>
      </Stack>
      );
}