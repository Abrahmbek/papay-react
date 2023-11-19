import { Avatar, Box, Container, Stack } from '@mui/material';
import { url } from 'inspector';
import React from 'react';


export function Recommendations() {
      return (
        <div className="top_article_frame">
             <Container 
              maxWidth="lg"
              sx={{mb:"50px", mt: "60px"}}
              style={{position: "relative"}}
              >
               <Stack flexDirection={"column"}
               alignItems={"center"}
               sx={{mt: "45px"}}
               >
                <Box className={"category_title"}>Tavsiya qilingan Maqolalar</Box>
                 <Stack className={"article_main"} flexDirection={"row"}>
                   <Stack className="article_container">
                     <Box className={"article_category"}>Ko'p Ko'rilgan</Box>

                     <Stack className={"article_box"}>
                        <Box
                        className={"ariticle_img"}
                        sx={{
                              backgroundImage: `url()`
                        }}
                        >
                        </Box>
                        <Box className={"aritcle_info"}>
                          <Box className={"article_main_info"}>
                              <div className={"article_author"}>
                                <Avatar
                                 alt="Author_photo"
                                 src="/auth/default_user1.svg"
                                 sx={{width: "35px", height: "35px"}}
                                 />
                                 <span className={"author_username"}>Alex</span>
                              </div>
                              <span className={"article_title"}>
                                Mazali va toyimli taomlar
                              </span>
                              <p className={"article_desc"}></p>
                          </Box>
                        </Box>
                      </Stack>
                      
                      <Stack className={"article_box"}>
                        <Box
                        className={"ariticle_img"}
                        sx={{
                              backgroundImage: `url()`
                        }}
                        >
                        </Box>
                        <Box className={"aritcle_info"}>
                          <Box className={"article_main_info"}>
                              <div className={"article_author"}>
                                <Avatar
                                 alt="Author_photo"
                                 src="/auth/default_user1.svg"
                                 sx={{width: "35px", height: "35px"}}
                                 />
                                 <span className={"author_username"}>Alex</span>
                              </div>
                              <span className={"article_title"}>
                                Mazali va toyimli taomlar
                              </span>
                              <p className={"article_desc"}></p>
                          </Box>
                        </Box>
                      </Stack>

                      <Box className={"article_category"}>Ko'p Yoqtirilgan</Box>

                        <Stack className={"article_box"}>
                        <Box
                        className={"ariticle_img"}
                        sx={{
                              backgroundImage: `url()`
                        }}
                        >
                        </Box>
                        <Box className={"aritcle_info"}>
                        <Box className={"article_main_info"}>
                              <div className={"article_author"}>
                              <Avatar
                                    alt="Author_photo"
                                    src="/auth/default_user1.svg"
                                    sx={{width: "35px", height: "35px"}}
                                    />
                                    <span className={"author_username"}>John</span>
                              </div>
                              <span className={"article_title"}>
                            Samarqand oshiga gap yo"q
                              </span>
                              <p className={"article_desc"}></p>
                        </Box>
                        </Box>
                        </Stack>
                        
                        <Stack className={"article_box"}>
                        <Box
                        className={"ariticle_img"}
                        sx={{
                              backgroundImage: `url()`
                        }}
                        >
                        </Box>
                        <Box className={"aritcle_info"}>
                        <Box className={"article_main_info"}>
                              <div className={"article_author"}>
                              <Avatar
                                    alt="Author_photo"
                                    src="/auth/default_user1.svg"
                                    sx={{width: "35px", height: "35px"}}
                                    />
                                    <span className={"author_username"}>John</span>
                              </div>
                              <span className={"article_title"}>
                              Samarqand oshiga gap yo"q
                              </span>
                              <p className={"article_desc"}></p>
                          </Box>
                        </Box>
                    </Stack>
                  </Stack>
                   
                      <Stack className={"article_container"}>
                        <Box className={"article_category"} style ={{padding: "35px"}}>Mashurlar</Box>
                        <Box className={"article_news"}>
                           <h1 style={{color: "orange"}}>TViewer</h1>
                        </Box>
                        <Box className={"article_news"}>
                           <h1 style={{color: "orange"}}>TViewer</h1>
                        </Box>
                      </Stack>
                 </Stack>
               </Stack>
             </Container>
       </div>
      );
}