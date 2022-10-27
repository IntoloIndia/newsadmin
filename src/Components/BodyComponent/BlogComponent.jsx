import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Avatar,
  IconButton
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
import Blogs from "./Blogs";
import { blogGet } from "../../Controller/BlogController";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
// import {photo} from '../../../public/logo.jpg.png'

export default function BlogComponent() {
  const classes = useStyles();

  const [blogPostData, setBlogPostData] = useState([]);

  const showblog = async () => {
    let data = await blogGet();
    if (data.status === 200) {
      // console.log(blogdata)
      setBlogPostData(data.data);
    }
  };

  useEffect(() => {
    showblog();
  }, []);

  // console.log(blogdata);
  const update = (id, name) => {
    alert("update");
  };

  const deletePost =(id)=>{
    alert("delete")
  }
  var sno = 0;
  return (
    <Box>
      <div className={classes.boxcantainer}>
        <PageHeader label="Blogs" />
        <Button variant="contained" color="secondary" size="small">
          <Blogs />
        </Button>
      </div>
      <Box style={{ marginTop: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">S.No</TableCell>
                    <TableCell align="center">Blogname</TableCell>
                    <TableCell align="center">BlogSubtitle</TableCell>
                    <TableCell >Image</TableCell>
                    <TableCell align="center">Aouther</TableCell>
                    <TableCell align="center">Date/Time</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                {blogPostData.map((ele, index) => {
                  return (
                    <TableBody key={index}>
                      <TableRow>
                        <TableCell align="center">{++sno}
                        
                        </TableCell>
                        <TableCell align="center">{ele.blog_title}</TableCell>
                        <TableCell align="center">{ele.blog_subTitle}</TableCell>
                        <TableCell align="center"><Avatar src=''/>{ele.blog_image}</TableCell>
                        <TableCell align="center">{"Aouther"}</TableCell>
                        <TableCell align="center">{"Date"}</TableCell>
                        <TableCell align="center">
                              <IconButton
                                variant="contained"
                                color="primary"
                                size="small"
                              >
                               <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                variant="contained"
                                color="secondary"
                                size="small"
                              >
                               <DeleteIcon onClick={()=>deletePost(ele._id)} />
                              </IconButton>
                            </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
