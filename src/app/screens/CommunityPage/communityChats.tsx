import React, { useState } from "react";
import { Box, Avatar, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../../../css/community.css";

export function CommunityChats() {

        /**INITIALIZATION */
   //const [messagesList, setMessagesList] = useState({});
      
        return (
            <Stack className={"chat_frame"}>
              <Box className={"chat_top"}>Jonli Muloqot</Box>
              <Box className={"chat_content"}>
                <Box className={"chat_main"}>
                  <Box
                    flexDirection={"row"}
                    style={{display: "flex"}}
                    sx={{m: "10px 0px"}}
                   >
                    <div className="msg_right"> salom hammaga</div>
                  </Box>
                  <Box
                    flexDirection={"row"}
                    style={{display: "flex"}}
                    alignItems={"flex-end"}
                    justifyContent={"flex-end"}
                    sx={{m: "10px 0px"}}
                   >
                    <div className="msg_left"> volekum Assalomu</div>
                  </Box>
                  <Box
                    flexDirection={"row"}
                    style={{display: "flex"}}
                    sx={{m: "10px 0px"}}
                   >
                        <Avatar alt={"Zarina"} src={"/auth/cute_girl.jpg"} />
                    <div className="msg_right"> salom hammaga</div>
                  </Box>
                </Box>
              </Box>

              <Box className={"chat_bott"}>
                <input 
                type={"text"}
                name={"message"}
                className={"msg_input"}
                placeholder={"Xabar junatish"}
                />
                <button className={"send_msg_btn"}>
                  <SendIcon style={{ color: "#fff"}} />
                </button>
              </Box>
            </Stack>
        );
}
