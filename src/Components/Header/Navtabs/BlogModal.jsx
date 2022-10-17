import React,{useState} from 'react'
import {
    Box,
    IconButton,
    Menu,
    MenuItem
  } from "@material-ui/core";
  import { useStyles } from "../HeaderStyles";
  import BookIcon from '@material-ui/icons/Book';
import Blogs from '../../BodyComponent/Blogs';
const BlogModal = () => {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box>
      <IconButton
        aria-controls='add'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'>
          {/* <BookIcon /> */}
            Blogs
      </IconButton>
      <Menu
        id='Notification'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}> <Blogs /> </MenuItem>
      </Menu>

    </Box>
  )
}

export default BlogModal;