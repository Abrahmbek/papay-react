import {  Box, Pagination, PaginationItem, Stack } from "@mui/material";
import React, {  useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import assert from "assert";
import { Definer } from "../../../lib/Definer.ts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import { setMemeberFollowings} from "./slice.ts"
import { Dispatch } from '@reduxjs/toolkit';
import {retrieveMemeberFollowings } from './selector.ts';
import {  FollowSearchObj, Following } from "../../../types/follow.ts";
import FollowApiService from "../../apiServices/followApiService.ts";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert.ts";
import { serverApi } from "../../../lib/config.ts";




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


export function MemberFollowing(props: any) {

       /**INITIALIZATION */
       const { followRebuild, setFollowRebuild, mb_id} = props;
       const {setMemeberFollowings} = actionDispatch(useDispatch());
       const {memeberFollowings} = useSelector( memeberFollowingsRetriever);
       const [followingsSearchObj, setFollowingsSearchObj] = useState<FollowSearchObj>(
        {page: 1, limit: 5, mb_id: mb_id}
       );

       useEffect(() => {
        const followService = new FollowApiService();
        followService
        .getMemberFollowings(followingsSearchObj)
        .then((data) =>  setMemeberFollowings(data))
        .catch((err) => console.log(err));
       },[followingsSearchObj, followRebuild]);


         /**HANDLERS */

     const handlePaginationChange = (event: any, value: number) => {
      followingsSearchObj.page = value;
      setFollowingsSearchObj({...followingsSearchObj});     
    }; 
 
    const unsubscribeHandler =async (e: any, id: string) => {
     try{
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
 
      const followService = new FollowApiService();
      await followService.unsubscribe(id);
 
      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
     }catch(err: any) {
       console.log(err);
       sweetErrorHandling(err).then();
     }
    }

      return (
        <Stack>
          {memeberFollowings.map((following: Following) =>{
            const image_url = following?.follow_member_data?.mb_image
            ? `${serverApi}/${following?.follow_member_data?.mb_image}`
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
                  <span className="username_text">{following?.follow_member_data?.mb_type}</span>
                  <span className="name_text">{following?.follow_member_data?.mb_nick}</span>
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
                  onClick={(e) => unsubscribeHandler(e, following?.follow_id)}
                  >
                  Bekor Qilish
                  </Button>
                 )}
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
                count={followingsSearchObj.page  >= 3 ? followingsSearchObj.page + 1 :3}
                 page={followingsSearchObj.page}
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