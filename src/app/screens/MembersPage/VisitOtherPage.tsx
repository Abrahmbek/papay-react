import React, {  useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import { Box, Container, Tab,  Stack, Pagination, PaginationItem } from "@mui/material";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import assert from "assert";
import { Definer } from "../../../lib/Definer.ts";


// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import { setChosenMember,
   setChosenMemberBoArticles,
    setChosenSingleBoArticle} from "./slice.ts"
import { Dispatch } from '@reduxjs/toolkit';
import { retrieveChosenMember ,
  retrieveChosenMemberBoArticles,
retrieveChosenSingleBoArticle } from './selector.ts';
import { Member } from "../../../types/user.ts";
import { BoArticle, SearchMemeberArticlesObj } from "../../../types/boArticle.ts";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiServices/memberApiService.ts";
import CommunityApiService from "../../apiServices/communityApiService.ts";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert.ts";
import FollowApiService from "../../apiServices/followApiService.ts";
import { verifiedMemberData } from "../../apiServices/verify.ts";
import { serverApi } from "../../../lib/config.ts";




/** REDUX Slice */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member) => dispach( setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) => dispach(  setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) => dispach( setChosenSingleBoArticle(data)),

 
});
/** REDUX SELECTOR */
const chosenMemberRetriever = createSelector (
  retrieveChosenMember ,
  (chosenMember) =>({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector (
  retrieveChosenMemberBoArticles ,
  (chosenMemberBoArticles) =>({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector (
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) =>({
    chosenSingleBoArticle,
  })
);



export function VisitOtherPage(props: any) {
      
  /**INITIALIZATIONS */

  const history = useHistory();
const { chosen_mb_id, chosen_art_id} = props;
  const {setChosenMember, 
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
    } = actionDispatch(useDispatch());
  const {chosenMember} = useSelector(chosenMemberRetriever);
  const {chosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
  const {chosenSingleBoArticle} = useSelector( chosenSingleBoArticleRetriever);

  const [value, setValue] = React.useState("1");
  const [memberArticleSearchObj, setMemberArticlesSearchObj] =
  useState<SearchMemeberArticlesObj>({mb_id: chosen_mb_id, page: 1, limit: 4});
  const [ articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [ followRebuild, setFollowRebuild] = useState<boolean>(false);


  useEffect(() => {
    if( chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }
    const communityService = new CommunityApiService();
    if(chosen_art_id) {
      communityService
      .getChosenArticle(chosen_art_id)
      .then((data) => {
        setChosenSingleBoArticle(data)
        setValue("4");
      })
      .catch((err) => console.log(err));
    }
    communityService
    .getMemberCommunityArticles(memberArticleSearchObj)
    .then((data) => setChosenMemberBoArticles(data))
    .catch((err) => console.log(err));
  },[memberArticleSearchObj, chosen_mb_id, articlesRebuild]);
       
  
  useEffect(() => {
    if( chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }
   const  memberService = new MemberApiService();
   memberService
    .getChosenMember(memberArticleSearchObj?.mb_id)
    .then((data) => setChosenMember(data))
    .catch((err) => console.log(err));
  },[verifiedMemberData, chosen_mb_id, followRebuild]);
          
  /**  HANDLERS */
   const handleChange = (event: any, newValue: string) => {
     setValue(newValue);
            
};   
const renderChosenArticleHandler = async (art_id: string) => {
  try{
    const communityService = new CommunityApiService();
    communityService
    .getChosenArticle(art_id)
    .then((data) => { setChosenSingleBoArticle(data);
    setValue("4");
  })
    .catch((err) => console.log(err));
  }catch(err: any) {
    console.log(err);
    sweetErrorHandling(err).then();
  }
}  

const subscribeHandler = async (e: any) => {
  try{

    assert.ok(verifiedMemberData, Definer.auth_err1);

   const followService = new FollowApiService();
   await followService.subscribe(e.target.value);

   await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
   setFollowRebuild(!followRebuild);
  }catch(err: any) {
    console.log(err);
    sweetErrorHandling(err).then();
  }
 }
      
 
const unsubscribeHandler = async (e: any) => {
  try{

   assert.ok(verifiedMemberData, Definer.auth_err1);

   const followService = new FollowApiService();
   await followService.unsubscribe(e.target.value);

   await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
   setFollowRebuild(!followRebuild);
  }catch(err: any) {
    console.log(err);
    sweetErrorHandling(err).then();
  }
 }
    
const handlePaginationChange = (event: any, value: number) => {
  memberArticleSearchObj.page = value;
  setMemberArticlesSearchObj({...memberArticleSearchObj});     
}; 

console.log("chosenMember.me_followed[0]?.my_following:::", chosenMember);
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
                          <MemberPosts
                            chosenMemberBoArticles={chosenMemberBoArticles}
                            renderChosenArticleHandler={renderChosenArticleHandler}
                                 setArticlesRebuild={ setArticlesRebuild}
                          />
                     <Stack 
                           sx={{my: "40px"}}
                           direction={"row"}
                           alignItems={"center"}
                           justifyContent={"center"}                          
                          >
                           <Box className="bottom_box">
                             <Pagination
                              count={memberArticleSearchObj.page  >= 3 ? memberArticleSearchObj.page + 1 :3}
                              page={memberArticleSearchObj.page}
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
                            onChange={handlePaginationChange}
                             />
                           </Box>
                          </Stack>
                        </Box>
                   
                     </TabPanel>
                     <TabPanel value={"2"}>
                       <Box className={"menu_name"}>Followers</Box>
                       <Box className={"menu_content"}>
                         <MemberFollowers 
                           setFollowRebuild={setFollowRebuild}
                           followRebuild={followRebuild}
                         mb_id={chosen_mb_id}
                         actions_enabled={false} />
                       </Box>
                     </TabPanel>
                     <TabPanel value={"3"}>
                       <Box className={"menu_name"}>Following</Box>
                       <Box className={"menu_content"}>
                         <MemberFollowing
                           setFollowRebuild={setFollowRebuild}
                           followRebuild={followRebuild}
                         mb_id={chosen_mb_id}
                          actions_enabled={false} />
                       </Box>
                     </TabPanel>
                    
                     <TabPanel value={"4"}>
                       <Box className={"menu_name"}> Tanlangan Maqola </Box>
                       <Box className={"menu_content"}>
                        <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
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
                         <img src={chosenMember?.mb_image
                         ? `${serverApi}/${chosenMember?.mb_image}`
                         : "/auth/odamcha.svg" }  
                          className={"order_user_avatar"}
                          alt="rasm"
                          />
                          
                        </div>
                         <span className="order_user_name">{chosenMember?.mb_nick}</span>
                         <span className="order_user_prof">{chosenMember?.mb_type}</span>
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
                                    <p className={"follows"}>Followers: {chosenMember?.mb_subscriber_cnt} 
                                                              Following: {chosenMember?.mb_follow_cnt}</p>
                            </Box>
                        <p className="user_desc">{chosenMember?.mb_description ?? "qo'shimcha malumot kiritilmagan"}</p>
                        <Box 
                         display={"flex"}
                         justifyContent={"flex-end"}
                         sx={{ mt: "10px"}}
                        >
                        <TabList
                         onChange={handleChange}
                         aria-label="lab API tabs example"
                         >
                              { chosenMember?.me_followed && 
                              chosenMember.me_followed[0]?.my_following ? (
                         <Tab 
                          style={{ flexDirection: "column"}}
                          value={"4"}
                          component={() =>(
                            <Button
                            value={chosenMember?._id}
                            variant={"contained"}
                           style={{backgroundColor: "#30945e"}}
                           onClick={unsubscribeHandler}
                          >
                              UNFOLLOW
                              </Button>
                           )}
                         />
                         ): (
                              <Tab 
                              style={{ flexDirection: "column"}}
                              value={"4"}
                              component={() =>(
                                <Button
                                value={chosenMember?._id}
                                variant={"contained"}
                               style={{backgroundColor: "#30945e"}}
                               onClick={subscribeHandler}
                              >
                                  FOLLOW 
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
                        className={`menu_box`}
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
                        className={`menu_box`}
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
                        className={`menu_box`}
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