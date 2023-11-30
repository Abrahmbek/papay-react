import React, { ChangeEvent, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import { Box, Container, Tab,  Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
//import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts.tsx";
import { MemberFollowers } from "./memberFollowers.tsx";
import { MemberFollowing } from "./memberFollowing.tsx";
import { MySettings } from "./mySettings.tsx";
// Others
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export function VisitMyPage(props: any) {
      
  /**INITIALIZATIONS */
  const [value, setValue] = React.useState("1");
          
           
          
  /**  HANDLERS */
   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
     setValue(newValue);
            
};     
      
   return ( 
       <div className="my_page">
          <Container maxWidth="lg" sx={{mt: "50px", mb: "50px"}}>
             <Stack className="my_page_frame">
               <TabContext value={value}>
                 <Stack className="my_page_left">
                   <Box display={"flex"} flexDirection={"column"}>
                     <TabPanel value={"1"}>
                        <Box className="menu_name">Mening Maqolalarim</Box>
                        <Box className="menu_content">
                          <MemberPosts/>
                          <Stack 
                           sx={{my: "40px"}}
                           direction={"row"}
                           alignItems={"center"}
                           justifyContent={"center"}                          
                          >
                           <Box className="bottom_box">
                             <Pagination
                              count={3}
                              page={1}
                              renderItem={(item) => (
                               <PaginationItem 
                                 components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                 }}
                                 {...item}
                                 color={"secondary"}
                               />
                            )}
                             />
                           </Box>
                          </Stack>
                        </Box>
                     </TabPanel>
                     <TabPanel value={"2"}>
                       <Box className={"menu_name"}>Followers</Box>
                       <Box className={"menu_content"}>
                         <MemberFollowers actions_enabled={true} />
                       </Box>
                     </TabPanel>
                     <TabPanel value={"3"}>
                       <Box className={"menu_name"}>Following</Box>
                       <Box className={"menu_content"}>
                         <MemberFollowing actions_enabled={true} />
                       </Box>
                     </TabPanel>
                     <TabPanel value={"4"}>
                       <Box className={"menu_name"} >Maqola yozish</Box>
                       <Box className={"write_content"}></Box>
                     </TabPanel>
                     <TabPanel value={"5"}>
                       <Box className={"menu_name"}> Tanlangan Maqola </Box>
                       <Box className={"menu_content"}></Box>
                     </TabPanel>
                     <TabPanel value={"6"}>
                       <Box className={"menu_name"}>Malumotlarni o'zgartirish</Box>
                       <Box className={"write_content"}>
                        <MySettings />
                       </Box>
                     </TabPanel>
                   </Box>
                  </Stack> 
                  <Stack className={"my_page_right"}>
                  <Box className={"order_info_box"}>

                        <a onClick={() => setValue("6")} className={"settings_btn"}>
                            <SettingsIcon/>
                        </a>
                        <Box
                         display={"flex"}
                         flexDirection={"column"}
                         alignItems={"center"}
                         >
                          <div className="order_user_img">
                         <img src={"/auth/cute_girl.jpg"}  
                          className={"order_user_avatar"}
                          alt="rasm"
                          />
                          
                        </div>
                         <span className="order_user_name">Zarina Nizommidinova</span>
                         <span className="order_user_prof">USER</span>
                        </Box>
                        <Box className="user_media_box">
                          <FacebookIcon />
                          <InstagramIcon />
                          <TelegramIcon />
                          <YouTubeIcon />
                        </Box>
                        <Box className="user_medi_box">
                           <p className="follows">Followers: 4   Following: 2</p>
                          
                        </Box>
                        <p className="user_desc">"qo'shimcha malumot kiritilmagan</p>
                        <Box 
                         display={"flex"}
                         justifyContent={"flex-end"}
                         sx={{ mt: "10px"}}
                        >
                        <TabList
                         onChange={handleChange}
                         aria-label="lab API tabs example"
                         >
                         <Tab 
                          style={{ flexDirection: "column"}}
                          value={4}
                          component={() =>(
                            <Button
                            variant={"contained"}
                            onClick={() => setValue("4")}  
                          >
                              Maqola Yozish
                              </Button>
                           )}
                         />
                        </TabList>
                       </Box>
                     </Box>
                     
                     <Box className="my_page_menu">
                       <TabList
                         onChange={handleChange}
                         aria-label="lab API tabs example"
                       >
                        <Tab 
                        style={{ flexDirection: "column"}}
                        value={4}
                        component={() =>(
                          <div
                        className={`menu_box ${value}`}
                          onClick={() => setValue("1")}  
                        >
                           <img src="/icons/Pencil.svg" alt="" />
                           <span>Maqolalarim</span>
                            </div>
                           )}
                        />
                        <Tab 
                        style={{ flexDirection: "column"}}
                        value={4}
                        component={() =>(
                          <div
                        className={`menu_box ${value}`}
                          onClick={() => setValue("2")}  
                        >
                           <img src="/icons/Group.svg" alt="" />
                           <span>Follower</span>
                            </div>
                        )}
                        />
                        <Tab 
                        style={{ flexDirection: "column"}}
                        value={4}
                        component={() =>(
                          <div
                        className={`menu_box ${value}`}
                          onClick={() => setValue("3")}  
                        >
                           <img src="/icons/User.svg" alt="" />
                           <span>Following</span>
                            </div>
                          )}
                        />
                        </TabList>
                     </Box>
                  </Stack>
               </TabContext>
             </Stack>
          </Container>
       </div>
      );
}