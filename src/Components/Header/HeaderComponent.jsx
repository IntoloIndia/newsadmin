import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Navbar from "./Navbar";
import Sidenav from "./Sidenav";
import { Switch, Route,Redirect} from "react-router-dom";
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
export default function HeaderComponent({setLoginStatus}) {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
    <div>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidenav
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      {/* // registerian our routes  */}
      <Box className={classes.wrapper}>
        <Switch>
         <Route exact path='/' render={() => <Dashboard />} />
          <Route exact path="/SignInOutContainer" render={() => <SignInOutContainer />} />
          <Route exact path="/Dashboard" render={() => <Dashboard />} />
          <Route exact path="/state" render={() => <StateCity />} />
          <Route exact path="/categarylist" render={() => <Categarylist />} />
          <Route exact path="/blog" render={() => <BlogComponent />} />
          <Route exact path="/admins" render={() => <Admin />} />
          <Route exact path="/navigation" render={() => <Appnav />} />
          <Route exact path="/logout" render={() => <Logout setLoginStatus={setLoginStatus} />} />
          <Route path="/" render={() => <Redirect to="/" />} />
          {/* <Redirect to="/SignInOutContainer"/> */}
        </Switch>
      </Box>
    </div>
  );
}
