import React, { useEffect, useState } from 'react';
import { Box, Container,  Stack } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import TabList from "@mui/lab/TabList";
import "../../../css/community.css";
import { CommunityChats } from './communityChats.tsx';
import TabContext from '@mui/lab/TabContext';
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import { TargetArticles } from './targetArticles.tsx';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommunityApiService from '../../apiServices/communityApiService.ts';
import { BoArticle, SearchArticlesObj } from '../../../types/boArticle.ts';

// REDUX
import { useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import { setTargetBoArticles} from "./slice.ts"
import { Dispatch } from '@reduxjs/toolkit';
import { retrieveTargetBoArticles } from './selector.ts';




/** REDUX Slice */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) => dispatch( setTargetBoArticles(data)),

 
});
/** REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector (
  retrieveTargetBoArticles,
  (targetBoArticles) =>({
    targetBoArticles,
  })
);



export function CommunityPage(props: any) {
      
      /**INITIALIZATION */

      const { setTargetBoArticles} = actionDispatch(useDispatch());
      const {targetBoArticles} = useSelector( targetBoArticlesRetriever);

      const [value, setValue] =React.useState("1");

      const [searchArticlesObj, setSerachArticlesObj] = useState<SearchArticlesObj> (
        {
          bo_id: "all",
          page: 1, 
          limit: 5,
        }
      );
      const [ articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());

      useEffect(() => {
        const communityService = new CommunityApiService();
        communityService
        .getTargetArticles(searchArticlesObj)
        .then((data) => setTargetBoArticles(data))
        .catch((err) => console.log(err));
      },[searchArticlesObj, articlesRebuild]);

      /**HANDLERS */

      const handleChange =(event: any, newValue: string) => {

        searchArticlesObj.page = 1;
        switch (newValue) {
          case "1":
            searchArticlesObj.bo_id = "all";
            break;
            case "2":
            searchArticlesObj.bo_id = "celebrity";
            break;
            case "3":
            searchArticlesObj.bo_id = "evaluation";
            break;
            case "4":
            searchArticlesObj.bo_id = "story";
            break;
        }
        setSerachArticlesObj({...searchArticlesObj});
            setValue(newValue);
      };
      const handlePaginationChange= (event: any, value: number) =>{
         searchArticlesObj.page = value;
         setSerachArticlesObj ({...searchArticlesObj });
      };
      return (
       <div className={"community_page"}>
         <div className={"community_frame"}>
         <Container sx={{mt: "50px", mb: "50px"}}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <CommunityChats />
                <Stack
                 className={"community_all_frame"}
                 inputMode={"text"}
                 style={{border: "1px solid #fff"}}
                 >
                  <TabContext value={value}>
                  <Box className={"article_tabs"}>
                   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                   <TabList
                        onChange={handleChange}
                        // value={value}
                        aria-label="basic tabs example"
                        style={{ borderColor: "blue" }}
                  >
                        <Tab label="Barcha Maqolalar" value={"1"} />
                        <Tab label="Mashxurlar" value={"2"} />
                        <Tab label="Oshhonaga Baxo" value={"3"} />
                        <Tab label="Hikoyalar" value={"4"} />
                    </TabList>
                   </Box>
                  </Box>
                <Box className={"article_main"} overflow={"hidden"}>
                  <TabPanel value={"1"}>
                        <TargetArticles 
                        targetBoArticles={targetBoArticles} 
                        setArticlesRebuild={setArticlesRebuild}
                        />
                   </TabPanel> 
                   <TabPanel value={"2"}>
                        <TargetArticles
                         targetBoArticles={targetBoArticles} 
                         setArticlesRebuild={setArticlesRebuild}
                         />
                   </TabPanel> 
                   <TabPanel value={"3"}>
                        <TargetArticles 
                        targetBoArticles={targetBoArticles} 
                        setArticlesRebuild={setArticlesRebuild}
                        />
                   </TabPanel> 
                   <TabPanel value={"4"}>
                        <TargetArticles 
                        targetBoArticles={targetBoArticles}
                        setArticlesRebuild={setArticlesRebuild}
                        />
                   </TabPanel> 
                </Box>

                <Box className={"article_bott"}>
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
                   onChange={handlePaginationChange}
                  />
                </Box>
               </TabContext>
              </Stack>
            </Stack>
         </Container>           
         </div>
      </div>
      );
}