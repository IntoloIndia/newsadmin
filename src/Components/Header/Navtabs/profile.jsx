import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import image from "./unnamed.jpg";
import { useStyles } from "../HeaderStyles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history =useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = ()=>{
    // alert("hello")
    localStorage.clear();
    history.push("/login")
  }

  const dropDownData = [
    // { label: "user", icon: <AccountCircleIcon /> },
    // { label: "settings", icon: <SettingsIcon /> },
    { label:  "Logout", icon: <ExitToAppIcon onClick={()=>logoutUser()}  /> },
  ];



  return (
    <Box>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
        startIcon={
          <Avatar src={image} className={classes.navAvatar}></Avatar>
        }></Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {dropDownData.map((item, i) => (
          <MenuItem key={i} component={ListItem} onClick={handleClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText  onClick={()=>logoutUser()}>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
