import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../components/shared/NavBar';
import { useUserStore } from '../store';
import {callLogout} from "../api/Accounts"

export default function DashboardPage() {
  const parts = window.location.pathname.split("/") // ["", "dashboard", "a|e", "pageType"]
  const userType = parts[2];
  const { role } = useUserStore.getState();
  const token = useUserStore((state) => state.token);
  const navigate = useNavigate();

  useEffect( () => {
    if(token == '' || !token){
      navigate("/login", { replace: true });
    }

    if( userType != "a" && userType != "e" ){
      if (role == "Admin" ){
        navigate("/dashboard/a", { replace: true });
      }
      else if(role == "Employee") {
        navigate("/dashboard/e", { replace: true });
      }
    }
  })
  
  const appBarRef = useRef(null);
  const [appBarHeight, setAppBarHeight] = useState(42);

  const ALL_INTERACTABLES = userType == "a" ? [
      {type: "link", url:"a/pending", name:"Pending"}, 
      {type: "link", url:"a/posts",name:"Posts"}, 
      {type: "btn", fn: callLogout,name:"Exit"}
  ] : [
      {type: "link", url:"e/apply", name:"Apply"}, 
      {type: "link", url:"e/posts",name:"Posts"}, 
      {type: "btn", fn: callLogout,name:"Exit"}
  ];

  useEffect(() => {
      if (appBarRef.current) {
          const appBarHeight = appBarRef.current.clientHeight;
          setAppBarHeight(appBarHeight);
      }
  }, []);

  return (
    <>
      <NavBar appBarRef={appBarRef} interactables={ALL_INTERACTABLES}/>
      <div id="DashboardContainer" style={{background:"#323232", paddingTop: appBarHeight, height:"calc(100% - " + appBarHeight + "px)"}}>
          {/* Employee or Admin content page */}
          <Outlet />
      </div>
    </>
  );
};
