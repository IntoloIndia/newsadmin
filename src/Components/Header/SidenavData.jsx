import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookIcon from "@material-ui/icons/Book";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyles";
import CategoryIcon from '@material-ui/icons/Category';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import NavigationIcon from '@material-ui/icons/Navigation';
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
export default function SidenavData({ handleDrawerClose }) {
  const classes = useStyles();

  
  const listItemData = [
    { label: "Dashboard", link: "/Dashboard", icon: <DashboardIcon /> },
    { label: "Post", link: "/blog", icon: <BookIcon /> },
    { label: "Category", link: "/categarylist", icon: <CategoryIcon /> },
    { label: "admins", link: "/admins", icon: <SupervisorAccountIcon /> },
    { label: "navigation", link: "/navigation", icon: <NavigationIcon /> },
    { label: "upload-pdf", link: "/upload-pdf", icon: <FileCopySharpIcon /> },
    { label: "Logout", link: "/logout", icon: <ExitToAppIcon /> },


    // { label: "Dashobard", link: "/", icon: <DashboardIcon /> },
    // { label: "subCategory", link: "/subCategory", icon: <FormatListBulletedIcon /> },
    // { label: "NewsEditer", link: "/newsediter", icon: <AssignmentIcon /> },
    // { label: "State", link: "/state", icon: <LocationCityIcon /> },
    // { label: "Link 1", link: "/link", icon: <PostAddIcon /> },
    // {
    //   label: "Notification",
    //   link: "/notification",
    //   icon: <NotificationsActiveIcon />,
    // },
  ];
  return (
    <List className={classes.navsidebar}>
      {listItemData.map((item, i) => (
        <Button
          size='small'
          className={classes.navButton}
          onClick={() => handleDrawerClose()}
          key={i}>
          <ListItem
            exact
            component={NavLink}
            to={item.link}
            className={classes.navlinks}
            activeClassName={classes.activeNavlinks}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
}
