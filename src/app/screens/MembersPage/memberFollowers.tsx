import {  Box, Pagination, PaginationItem, Stack } from "@mui/material";
import React, {  useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import { setMemberFollowers} from "./slice.ts"
import { Dispatch } from '@reduxjs/toolkit';
import {retrieveMemberFollowers } from './selector.ts';
import { FollowSearchObj, Follower } from "../../../types/follow.ts";
import FollowApiService from "../../apiServices/followApiService.ts";
import { serverApi } from "../../../lib/config.ts";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert.ts";
import assert from "assert";
import { Definer } from "../../../lib/Definer.ts";




/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower) => dispatch(  setMemberFollowers(data)),

 
});
/** REDUX SELECTOR */
const memberFollowersRetriever = createSelector (
  retrieveMemberFollowers,
  (memberFollowers) =>({
    memberFollowers,
  })
);

export function MemberFollowers(props: any) {

     /**INITIALIZATION */
    const { followRebuild, setFollowRebuild, mb_id} = props;
     const { setMemberFollowers} = actionDispatch(useDispatch());
     const {memberFollowers} = useSelector(memberFollowersRetriever);
     const [followersSearchObj, setFollowersSearchObj] = useState<FollowSearchObj>(
      {page: 1, limit: 5, mb_id: mb_id}
     );

     useEffect(() => {
      const followService = new FollowApiService();
      followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
     },[followersSearchObj, followRebuild]);


     /**HANDLERS */

     const handlePaginationChange = (event: any, value: number) => {
     followersSearchObj.page = value;
     setFollowersSearchObj({...followersSearchObj});     
   }; 

   const subscribeHandler =async (e: any, id: string) => {
    try{
     e.stopPropagation();
     assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);

     const followService = new FollowApiService();
     await followService.subscribe(id);

     await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
     setFollowRebuild(!followRebuild);
    }catch(err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
   }
     return (
       
        <Stack>
          {memberFollowers.map((follower) =>{
            const image_url = follower?.subscriber_member_data?.mb_image
            ? `${serverApi}/${follower?.subscriber_member_data?.mb_image}`
            : "/icons/odamcha.svg";
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
                  <span className="username_text">{follower?.subscriber_member_data?.mb_type}</span>
                  <span className="name_text">{follower?.subscriber_member_data?.mb_nick}</span>
                 </div>
                <Stack className="btn_follow">
                 {props.actions_enabled &&
                 (follower.me_followed && follower.me_followed[0]?.my_following ? (
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
                  onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
                  >
                     Follow Back
                  </Button>
                 ))}
                 </Stack>
               </Box>
            );
          })}
            <Stack 
               sx={{my: "40px"}}
               direction={"row"}
                alignItems={"center"}
               justifyContent={"center"}                          
                >
              <Box className="bottom_box">
                <Pagination
                count={followersSearchObj.page  >= 3 ? followersSearchObj.page + 1 :3}
                 page={followersSearchObj.page}
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
        </Stack>
      
      );
}