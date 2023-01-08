import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { Switch, Route,Redirect, useHistory,} from "react-router-dom";
import Dashboard from "../BodyComponent/Dashboard/Dashboard";
import BlogComponent from "../BodyComponent/BlogComponent";
import Link from "../BodyComponent/Link";
import NewsEditer from "../BodyComponent/NewsEditer";
import Notification from "../BodyComponent/Notification";
import Logout from "../BodyComponent/Logout";
import Categarylist from "../BodyComponent/Categarylist";
import { useStyles } from "./HeaderStyles";
import StateCity from "../BodyComponent/StateCity";
import SignInOutContainer from "../../SignInOutContainer";
import Admin from "../BodyComponent/Admin/Admin";
import Appnav from "../BodyComponent/navigationpage/Appnav";
import { useEffect } from "react";
import Login from "../../Login/Login";
import ProtectedRoute from "../ProtectedRoute";
import useAuth from "../useAuth";
import Uploadpdf from "../BodyComponent/Uploadpdf";

export default function HeaderComponent({setLoginStatus,dataFromChild}) {
  const classes = useStyles();
  const history = useHistory();
  const [isAuth, login, logout] = useAuth(false)

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  //  console.log(dataFromChild)

  // useEffect(()=>{
  //   const auth = localStorage.getItem("user-info");
  //   if(auth){
  //     history.push("/Dashboard"); 
  //   }
  // },[])
  

  const logoutUser = ()=>{
    // alert("hello")
    localStorage.clear();
    history.push("/login")
  }


  return (
    <div>

     {/* {
      isAuth ?
     <Switch>
          <Route exact path='/' render={() => <Login />} />
      </Switch>:null
     }  */}

     {!<Login />?null:
     <>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        /> 

      </>
    
  }
       
      {/* // registerian our routes  */}
      <Box className={classes.wrapper}>
      <Switch>
          <Route exact path='/login' render={() => <Login />} />

         {/* <Route exact path="/Dashboard" component={<Dashboard />} /> */}
           <ProtectedRoute exact path="/Dashboard" component={()=><Dashboard />}/>
          {/* <Route exact path="/state" render={() => <StateCity />} /> */}
          <ProtectedRoute exact path="/categarylist" component={() => <Categarylist />} />
          <ProtectedRoute exact path="/blog" component={() => <BlogComponent />} />
          <ProtectedRoute exact path="/admins" component={() => <Admin />} />
          <ProtectedRoute exact path="/navigation" component={() => <Appnav />} />
          <ProtectedRoute exact path="/upload-pdf" component={() => <Uploadpdf />} />
          <ProtectedRoute exact path="/logout" component={() => <Logout logoutUser={logoutUser()}
          />} />
          <Redirect to="/Dashboard"/>
          {/* <ProtectedRoute path="/" component={() => <Redirect to="/" />} />  */}
        </Switch>
      </Box>
    </div>
  );
}
