import React,{useState} from 'react'
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    // ListItemIcon,
    Menu,
    MenuItem,
    Typography
  } from "@material-ui/core";
  import { useStyles } from "../HeaderStyles";
import AddIcon from '@material-ui/icons/Add';
import Categarypopup from '../../BodyComponent/Categarypopup';
const Addmoreitem = () => {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const dropDownData = [
  //   { label: "categary", icon: <CategaryModal/> },
  //   { label: "product", link: "/product", },
  // ];

  return (
    <Box>
      <IconButton
        aria-controls='add'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
           {/* Categary */}
          <AddIcon />
      </IconButton>
      <Menu
        id='Notification'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {/* <List className={classes.navlistitem}>
          {dropDownData.map((item, i) => (
            <ListItem key={i} onClick={handleClose}>
              {/* <ListItemIcon>
                <Avatar className={classes.ulAvater}>
                  {item.label[0].toUpperCase()}
                </Avatar>
              </ListItemIcon> */}
          
              {/* <ListItemText
                primary={item.label}
                secondary={item.icon}>
                </ListItemText>
            </ListItem> */}
            
          {/* ))}
        </List> */} 
        <MenuItem onClick={handleClose}><Categarypopup /></MenuItem>
      </Menu>
    </Box>
  )
}

export default Addmoreitem