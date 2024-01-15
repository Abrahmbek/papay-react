import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Box, Avatar, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "../../../css/community.css";
import { SocketContext} from "../../context/socket.js"
import { ChatGreetMsg, ChatInfoMsg, ChatMessage } from "../../../types/others.js";
import { verifiedMemberData } from "../../apiServices/verify.ts";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert.ts";
import  assert  from "assert";
import { Definer } from "../../../lib/Definer.ts";
import { RippleBadge } from "../../MaterialTheme/styled.ts";

const NewMessage = (data: any) => {
  if (data.new_message.mb_id === verifiedMemberData?._id) {
   return (
    <Box
    flexDirection={"row"}
    style={{display: "flex"}}
    alignItems={"flex-end"}
    justifyContent={"flex-end"}
    sx={{m: "10px 0px"}}
   >
    <div className="msg_left"> {data.new_message.msg}</div>
  </Box>
   ); 
  } else {
   return (
    <Box
        flexDirection={"row"}
        style={{display: "flex"}}
       sx={{m: "10px 0px"}}
           >
       <Avatar alt={data.new_message.mb_nick}
        src={data.new_message.mb_image} />
        <div className="msg_right">{data.new_message.msg} </div>
     </Box>
   );
  }
 
};

export function CommunityChats() {

        /**INITIALIZATION */
        
   const [messagesList, setMessagesList] = useState([]);
   const socket = useContext(SocketContext);
   const [onlineUsers, setOnlineUsers] = useState<number>(0);
   const textInput: any = useRef(null);
   const [message, setMessage] = useState<string>("");

   useEffect(() => {
    socket.connect();
    console.log("PRINTED");

    socket?.on("connect", function() {
      console.log("CLIENT: connected");
    });

    socket?.on("newMsg",( new_message: ChatMessage) => {
      console.log("CLIENT: new message");
      messagesList.push(
        //@ts-ignore
        <NewMessage new_message={new_message} key={messagesList.length} />
      );
      setMessagesList([...messagesList]);
      
    });

    socket?.on("greetMsg", (msg: ChatGreetMsg) => {
     
      console.log("CLIENT: greet message");
      messagesList.push(
         //@ts-ignore
        <p 
        
        style={{
          textAlign: "center",
          fontSize: "large",
          fontFamily: "serif",
        }}>
          {msg.text}, dear {verifiedMemberData?.mb_nick ??  "guest"}
        </p>
      );
      setMessagesList([...messagesList]);
    });

    
    socket?.on("infoMsg", (msg: ChatInfoMsg) => {
      console.log("CLIENT: info message");
      setOnlineUsers(msg.total);
    });
    return() => {
      socket.disconnect();
    };
   },[socket]);
      

   /**HANDLERS */
const getInputMessageHandler = useCallback((e: any) => {
  const text = e.target.value;
  setMessage(text);
},[message]);

const getKeyHandler = (e: any) => {
  try {
  if(e.key === "Enter") {
    assert.ok(message, Definer.input_err3);
    onClickhandler(); 
  }
  }catch(err: any) {
    sweetErrorHandling(err).then()
  }
}
const onClickhandler = () => {
  try{
if(!verifiedMemberData) {
  textInput.current.value = "";
  sweetFailureProvider("please Login first!", true);
  return false;
}

textInput.current.value = "";
assert.ok(message, Definer.input_err3);

const mb_image_url =
verifiedMemberData?.mb_image ?? "/auth/odamcha.svg"

socket.emit("createMsg", {
  msg: message,
  mb_id: verifiedMemberData?._id,
  mb_nick: verifiedMemberData?.mb_nick,
  mb_image: mb_image_url,
});
setMessage("");
  }catch(err: any) {
    console.log("onClickHandler, ERROR", err);
    sweetErrorHandling(err).then();
  }
};
        return (
            <Stack className={"chat_frame"}>
              <Box className={"chat_top"}>
                <div>Jonli Muloqot </div>
                <RippleBadge
                style={{margin: "-30px 0 0 20px"}}
                badgeContent={onlineUsers}
                />
                </Box>
              <Box className={"chat_content"}>
                <Box className={"chat_main"}>
                  <Box
                    flexDirection={"row"}
                    style={{display: "flex"}}
                    sx={{m: "10px 0px"}}
                   >
                    <div className="msg_right"> bu yer jonli muloqot</div>
                  </Box>
                 {messagesList}
                  
                </Box>
              </Box>

              <Box className={"chat_bott"}>
                <input 
                ref={textInput}
                type={"text"}
                name={"message"}
                className={"msg_input"}
                placeholder={"Xabar junatish"}
                onChange={getInputMessageHandler}
                onKeyDown={getKeyHandler}
                />
                <button className={"send_msg_btn"}
                onClick={onClickhandler}
                >
                  <SendIcon style={{ color: "#fff"}} />
                </button>
              </Box>
            </Stack>
        );
}
