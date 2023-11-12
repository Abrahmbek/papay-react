import { Badge, Box, Button, Container, IconButton, Stack } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

export function  NavbarRestaurant(props: any) {
    return ( <div className='format_restaurant home_navbar'>
      <Container>
            <Stack 
            flexDirection={"row"} 
            className='navbar_config'
            justifyContent={'space-between'}>
                <Box>
                  <img src="/icons/Papay..svg" alt="" />
                </Box>
                <Stack 
                flexDirection={"row"} 
                justifyContent='space-evenly'
                alignItems={"center"}
                className='navbar_links'>
                  <Box className="hover_line" onClick={props.SetPath}>
                        <NavLink to="/">
                              Bosh Sahifa
                        </NavLink>
                  </Box>
                  <Box className="hover_line" onClick={props.SetPath}>
                        <NavLink to="/restaurant" activeClassName="underline">
                            Oshhona
                        </NavLink>
                  </Box>
                  <Box className="hover_line" onClick={props.SetPath}>
                        <NavLink to="/orders" activeClassName="underline">
                             Buyrtma
                        </NavLink>
                  </Box>
                  <Box className="hover_line" onClick={props.SetPath}>
                        <NavLink to="/community" activeClassName="underline">
                         Jamiyat
                        </NavLink>
                  </Box>
                  <Box className="hover_line" onClick={props.SetPath}>
                        <NavLink to="/help" activeClassName="underline">
                           Yordam
                        </NavLink>
                  </Box>
                   
                  <Box className="hover_line">
                        <IconButton 
                          aria-label="cart"
                          id="basic-button"
                           aria-controls={undefined}
                           aria-haspopup="true"
                            aria-expanded={undefined}
                         >
                              <Badge badgeContent={3} color='secondary'>
                               <img src="/icons/shopping-cart.svg" alt="" />
                              </Badge>
                              
                        </IconButton>
                  </Box>
                    <Box>
                        <Button variant='contained' 
                        style={{color: "#FFFFFF", background: "#1976d2"}}>
                              KIRISH
                        </Button>
                    </Box>
                </Stack>
            </Stack>
              
      </Container> 
      </div>);
};