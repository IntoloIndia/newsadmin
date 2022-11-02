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
  IconButton,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Card,
  CardMedia,
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
// import Blogs from "./Blogs";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
  blogGet,
  blogPostDelete,
  blogPostUpdate,
} from "../../Controller/BlogController";
import { categoryGet } from "../../Controller/CategoryController";
import ReactReadMoreReadLess from "react-read-more-read-less";
// import {photo} from '../../../public/logo.jpg.png'
import { makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// const useStyles = makeStyles((theme) => ({
//   root: {
//
//   large: {
//     width: theme.spacing(7),
//     height: theme.spacing(7),
//   },
// }));

export default function BlogComponent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [blog_title, setBlog_Title] = useState("");
  const [blog_Sub_Title, setBlog_Sub_Title] = useState("");
  const [aouther, setAouther] = useState("");
  const [post_image, setPost_Image] = useState();
  const [blog_Discription, setBlog_Discription] = useState("");
  const [categorylist, setCategoryList] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [publish_Date, setPublish_Date] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [blogPostData, setBlogPostData] = useState([]);
  const [blogPost_id, setBlogPost_Id] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateModal(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const showblog = async () => {
    let data = await blogGet();
    if (data.status === 200) {
      // console.log(blogdata)
      setBlogPostData(data.data);
    }
  };

  const postCategory = async () => {
    let data = await categoryGet();
    if (data.status === 200) {
      console.log(data);
      setCategoryList(data.data);
    }
  };

  useEffect(() => {
    showblog();
    postCategory();
  }, []);

  const update = (id, title, subTitle, dsc, scid, bimage) => {
    setBlogPost_Id(id);
    setBlog_Title(title);
    setBlog_Sub_Title(subTitle);
    setBlog_Discription(dsc);
    setSelectCategory(scid);
    setPost_Image(bimage);
    setUpdateModal(true);
    setOpen(true);
  };

  // console.log(blogPost_id)

  const deletePost = async (id) => {
    // alert(id)
    let data = await blogPostDelete(id);
    if (data.status === 200) {
      alert("post delete ");
      showblog();
    } else {
      alert("post not delete");
    }
  };

  const onSubmit = async () => {
    const data = new FormData();
    data.append("image", post_image);
    data.set("blog_title", blog_title);
    data.set("blog_subTitle", blog_Sub_Title);
    data.set("blog_dsc", blog_Discription);
    data.set("category_id", selectCategory);
    // alert(JSON.stringify(data))
    fetch(`${process.env.REACT_APP_API_URL}blogs`, {
      method: "post",
      body: data,
    })
      .then((result) => {
        console.log(result);
        alert("data save & file sent sucessfully");
        showblog();
      })
      .then((error) => {
        console.log("file not upload", error);
      });
    setOpen(false);
  };

  const blogPostUpdate = async () => {
    const data = new FormData();
    data.append("image", post_image);
    data.set("blog_title", blog_title);
    data.set("blog_subTitle", blog_Sub_Title);
    data.set("blog_dsc", blog_Discription);
    data.set("category_id", selectCategory);

    fetch(`${process.env.REACT_APP_API_URL}blogs/` + blogPost_id, {
      method: "put",
      body: data,
    })
      .then((result) => {
        console.log(result);
        alert("post update");
      })
      .then((error) => {
        console.log("file not upload", error);
        showblog();
      });
    setOpen(false);
  };

  var sno = 0;
  return (
    <Box>
      <div className={classes.boxcantainer}>
        <PageHeader label="Blogs" />

        <Box>
          <div
            style={{ display: "flex", justifyContent: "flex-end", margin: 5 }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleClickOpen}
            >
              Create
            </Button>
          </div>
          <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <DialogTitle id="alert-dialog-title">Post</DialogTitle>
              <IconButton>
                {/* <DeleteIcon fontSize="large" /> */}
                <CloseIcon fontSize="middem" onClick={handleClose} />
              </IconButton>
            </Box>
            <hr />
            <DialogContent>
              <form encType="multipart/form-data">
                <TextField
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  label="Title"
                  value={updateModal ? blog_title : null}
                  onChange={(e) => setBlog_Title(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  label="sub Title"
                  multiline
                  rows={2}
                  value={updateModal ? blog_Sub_Title : null}
                  onChange={(e) => setBlog_Sub_Title(e.target.value)}
                />

                <TextField
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  size="small"
                  multiline
                  rows={4}
                  fullWidth
                  label="blog dsc"
                  value={updateModal ? blog_Discription : null}
                  onChange={(e) => setBlog_Discription(e.target.value)}
                />
                <FormControl
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  variant="outlined"
                  // label="Category"
                >
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Category"
                    value={
                      updateModal
                        ? selectCategory
                        : selectCategory.category_name
                    }
                    onChange={(e) => setSelectCategory(e.target.value)}
                  >
                    {categorylist != undefined
                      ? categorylist.map((ele, index) => (
                          <MenuItem key={index} value={ele._id}>
                            {ele.category_name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>

                <TextField
                  type="file"
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  name="image"
                  // value={updateModal ? post_image : null}
                  onChange={(e) => setPost_Image(e.target.files[0])}
                />
                {updateModal ? (
                  // <img src={blog_image}/>
                  <TextField
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    size="small"
                    fullWidth
                    name="blog_image"
                    value={updateModal ? post_image : null}
                    // onChange={(e) => setPost_Image(e.target.files[0])}
                  />
                ) : null}
                <DialogActions>
                  <hr />
                  {!updateModal ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onSubmit()}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => blogPostUpdate()}
                    >
                      update
                    </Button>
                  )}
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
      </div>

      <Box style={{ marginTop: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper} style={{ maxHeight: 600 }}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead style={{ bachgroundcolor: "red" }}>
                  <TableRow>
                    <StyledTableCell >S.No</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Sub title</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Image</StyledTableCell>
                    {/* <TableCell align="center">Aouther</TableCell> */}
                    <StyledTableCell>Date/Time</StyledTableCell>
                    <StyledTableCell>Edit</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                {blogPostData != undefined
                  ? blogPostData.map((ele, index) => {
                      return (
                        <TableBody key={index}>
                          <StyledTableRow>
                            <StyledTableCell >
                              {++sno}
                            </StyledTableCell>
                            <StyledTableCell style={{fontWeight: "bold",fontSize:16}}>
                              {ele.blog_title}
                            </StyledTableCell>
                            <StyledTableCell >
                              <ReactReadMoreReadLess
                                charLimit={100}
                                readMoreText={"Read more ▼"}
                                readLessText={"Read less ▲"}
                              >
                                {ele.blog_subTitle}
                              </ReactReadMoreReadLess>
                            </StyledTableCell>
                            <StyledTableCell >
                              <ReactReadMoreReadLess
                                charLimit={100}
                                readMoreText={"Read more ▼"}
                                readLessText={"Read less ▲"}
                              >
                                {ele.blog_dsc}
                              </ReactReadMoreReadLess>
                            </StyledTableCell>
                            <StyledTableCell >
                              {ele.category_name}
                            </StyledTableCell>

                            {/* <StyledTableCell align="center">{ele.blog_image}</StyledTableCell> */}
                            <TableCell >
                              {/* <Card>
                                <CardMedia
                                  component="img"
                                  height="40"
                                  image="logo512.png"
                                  alt="green iguana"
                                />
                              </Card> */}
                              <Avatar
                                alt="Remy Sharp"
                                src="logo.jpg.png"
                                className={classes.large}
                              />
                              {/* <img src={ele.blog_image} alt="no image" /> */}
                              {/* <img src={ele.blog_image} alt={"no image"} style={{width: 100, height: 200}} /> */}
                            </TableCell>
                            <StyledTableCell >
                              {"Date"}
                            </StyledTableCell>
                            <StyledTableCell >
                              <IconButton
                                variant="contained"
                                color="primary"
                                size="small"
                              >
                                <EditIcon
                                  onClick={() => {
                                    update(
                                      ele._id,
                                      ele.blog_title,
                                      ele.blog_subTitle,
                                      ele.blog_dsc,
                                      ele.category_id,
                                      ele.blog_image
                                    );
                                  }}
                                />
                              </IconButton>
                            </StyledTableCell>
                            <StyledTableCell>
                              <IconButton
                                variant="contained"
                                color="secondary"
                                size="small"
                              >
                                <DeleteIcon
                                  onClick={() => deletePost(ele._id)}
                                />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      );
                    })
                  : null}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
// ele.blog_SubTitle,ele.blog_dsc,ele.blog_image
// let blogdata = await blogPostUpdate(data,blogPost_id)
//     if(blogdata.status===200){
//       alert("update post")
//       showblog();
//     }else{
//       alert("not update post")
//     }
