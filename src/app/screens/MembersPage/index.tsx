import React from 'react';
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { VisitOtherPage } from './VisitOtherPage.tsx';
import { VisitMyPage } from './VisitMyPage.tsx';
import "../../../css/my_page.css";


export function MembersPage() {
  let member = useRouteMatch();
     
     return (  
     <div className="restaurant_page">
         <Switch>
            <Route path={`${member.path}/other`}>
              <VisitOtherPage />
             </Route>
            <Route path={`${member.path}`}>
              <VisitMyPage />
            </Route>
           
         </Switch>
      </div>
     );
}