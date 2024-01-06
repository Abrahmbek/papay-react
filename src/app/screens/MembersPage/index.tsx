import React from 'react';
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch, useLocation } from 'react-router-dom';
import { VisitOtherPage } from './VisitOtherPage.tsx';
import { VisitMyPage } from './VisitMyPage.tsx';
import "../../../css/my_page.css";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}


export function MembersPage(props: any) {
  const {verifiedMemberData} = props;
  let member = useRouteMatch();
  const query = useQuery();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;
     return (  
     <div className="restaurant_page">
         <Switch>
            <Route path={`${member.path}/other`}>
              <VisitOtherPage 
              verifiedMemberData={verifiedMemberData} 
              chosen_mb_id={chosen_mb_id} 
              chosen_art_id={chosen_art_id}
              />
             </Route>
            <Route path={`${member.path}`}>
              <VisitMyPage verifiedMemberData={verifiedMemberData} />
            </Route>
           
         </Switch>
      </div>
     );
}