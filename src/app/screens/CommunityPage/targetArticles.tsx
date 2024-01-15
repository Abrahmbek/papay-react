import React from 'react';
import { Box, Checkbox, Link,  Stack } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BoArticle } from '../../../types/boArticle';
import { serverApi } from '../../../lib/config.ts';
import moment from 'moment';
import { CheckBox } from '@mui/icons-material';
import  assert  from "assert";
import { Definer } from '../../../lib/Definer.ts';
import MemberApiService from '../../apiServices/memberApiService.ts';
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../../lib/sweetAlert.ts';
import { verifiedMemberData } from '../../apiServices/verify.ts';


export function TargetArticles(props: any) {
  const { setArticlesRebuild}  = props;
    /**HANDLERS */
    const targetLikeHandler = async (e: any) => {
    
      try{
       assert.ok(verifiedMemberData, Definer.auth_err1);

       const memberService = new MemberApiService();
       const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
       });
       assert.ok(like_result, Definer.general_err1);
       await sweetTopSmallSuccessAlert("success", 700, false);
       setArticlesRebuild(new Date());
      }catch(err: any) {
       console.log(err);
       sweetErrorHandling(err).then();
      }
    }
      return (
        <Stack >
          { props.targetBoArticles?.map((article: BoArticle) => {
            const art_image_url = article?.art_image ?`${serverApi}/${article.art_image}` : "/auth/default_user1.svg";
            console.log("rasmkemadi:: ", art_image_url);
            return (
              <Link
                className={"all_article_box"}
                sx={{textDecoration: "none"}}
                
                href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
              >
                <Box
                 className={"all_article_img"}
                 sx={{backgroundImage: `url(${art_image_url})`}}
                
                ></Box>
                <Box className={"all_article_container"}>
                 <Box alignItems={"center"} display={"flex"}>
                  <img
                    src={"/auth/default_user1.svg"}
                    width={"35px"}
                    style={{borderRadius: "50%", backgroundSize: "cover"}}
                    alt=''
                  />
                  <span className={"all_article_auth_user"}>{article?.member_data.mb_nick}</span>
                 </Box>
                 <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{mt: "15px"}}
                 >
                  <span className={"all_article_title"}>{article?.bo_id}</span>
                  <p className={"all_article_desc"}>{article?.art_subject}</p>
                 </Box>
                 <Box>
                <Box
                  className="article_share"
                  style={{ width: "100%", height: "auto" }}
                >
                  <Box className="article_share_main">
                    <span > {moment().format("YY-MM-DD HH:mm" )}</span>
                    <Checkbox 
                   sx={{ml: "40px"}}
                   icon={<FavoriteBorder />}
                   id={article?._id}
                   checkedIcon={<Favorite style={{color: "red"}}/>}
                   checked={article?.me_liked && article.me_liked[0]?.my_favorite ? true : false}

                   onClick={targetLikeHandler}
                   />  
                  
                  
                   
                    <span style={{ marginRight: "18px" }}>{article?.art_likes}</span>
                    <RemoveRedEyeIcon />
                    <span style={{ marginLeft: "10px" }}>{article?.art_views}</span>
                  </Box>
                </Box>
              </Box>
               </Box>
              </Link>
            );
          })}
        </Stack>
      );
}