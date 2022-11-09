import React from "react";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Profile from "./Navtabs/profile";
import Notification from "./Navtabs/notification";
import { useStyles } from "./HeaderStyles";
import Messages from "./Navtabs/Messages";
import MenuIcon from "@material-ui/icons/Menu";
import Addmoreitem from "./Navtabs/Addmoreitem";
import BlogModal from "./Navtabs/BlogModal";
import { Link } from "react-router-dom";


export default function Navbar({ handleDrawerOpen }) {
  const classes = useStyles();

  return (
    <AppBar position='fixed'className={classes.navbarapp} >
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' className={classes.logo}>
         <Link to ='/' style={{color:"white",textDecoration:"none",fontFamily:"monospace"}}>{"Yesh Bharat"}</Link>
        </Typography>
        <Hidden smDown>
          <Box style={{ display: "flex" }}>
            {/* <BlogModal /> */}
            <Addmoreitem />
            <Notification />
            <Messages />
            <Profile />
          </Box>
        </Hidden>
        <Hidden mdUp>
          <IconButton color='inherit' onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
