import React, {  useState } from "react";
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
//import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts.tsx";
import { MemberFollowers } from "./memberFollowers.tsx";
import { MemberFollowing } from "./memberFollowing.tsx";
import TViewer from "../../components/tuiEditor/TViewer.tsx";
//import { MySettings } from "./mySettings.tsx";



export function VisitOtherPage(props: any) {
      
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
                        <Box className="menu_name"> Maqolalar</Box>
                        <Box className="menu_content">
                          <MemberPosts/>
                          
                        </Box>
                     </TabPanel>
                     <TabPanel value={"2"}>
                       <Box className={"menu_name"}>Followers</Box>
                       <Box className={"menu_content"}>
                         <MemberFollowers actions_enabled={false} />
                       </Box>
                     </TabPanel>
                     <TabPanel value={"3"}>
                       <Box className={"menu_name"}>Following</Box>
                       <Box className={"menu_content"}>
                         <MemberFollowing actions_enabled={false} />
                       </Box>
                     </TabPanel>
                    
                     <TabPanel value={"4"}>
                       <Box className={"menu_name"}> Tanlangan Maqola </Box>
                       <Box className={"menu_content"}>
                        <TViewer text={`<h3>hello boss</h3>`}/>
                       </Box>
                     </TabPanel>
                     
                   </Box>
                  </Stack> 
                  <Stack className={"my_page_right"}>
                  <Box className={"order_info_box"}>
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
                        <Box className={"user_media_box_follow"}
                                     sx={{
                                         flexDirection: "row",
                                     }}
                                >
                                    <p className={"follows"}>Followers: 3 Following: 2</p>
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
                              {true ? (
                         <Tab 
                          style={{ flexDirection: "column"}}
                          value={"4"}
                          component={(e) =>(
                            <Button
                            variant={"contained"}
                           style={{backgroundColor: "#30945e"}}
                          >
                              BEKOR QILISH
                              </Button>
                           )}
                         />
                         ): (
                              <Tab 
                              style={{ flexDirection: "column"}}
                              value={"4"}
                              component={(e) =>(
                                <Button
                                variant={"contained"}
                               style={{backgroundColor: "#30945e"}}
                              >
                                  FOLLOW QILISH
                                  </Button>
                               )}
                             />
                         )}
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
                        value={"1"}
                        component={(e) =>(
                          <div
                        className={`menu_box ${e}`}
                          onClick={() => setValue("1")}  
                        >
                           <img src="/icons/Pencil.svg" alt="" />
                           <span>Maqolalari</span>
                            </div>
                           )}
                        />
                        <Tab 
                        style={{ flexDirection: "column"}}
                        value={"2"}
                        component={() =>(
                          <div
                        className={`menu_box ${value}`}
                          onClick={() => setValue("2")}  
                        >
                           <img src="/icons/Group.svg" alt="" />
                           <span>Followers</span>
                            </div>
                        )}
                      />
                        <Tab 
                        style={{ flexDirection: "column"}}
                        value={"3"}
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