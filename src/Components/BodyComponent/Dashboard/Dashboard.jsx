import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Button, IconButton,Table,TableHead,TableContainer,Paper, TableCell,TableBody,TableRow,Avatar,card,CardMedia } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../Common/CommonComponent";
import { DisplayCardGraph } from "../../Common/GraphComponent";
import { CardContent } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { withStyles } from "@material-ui/core/styles";
import {
  fakeArrayDataGenerator,
  randomValueGenerator,
} from "../../../utils/fakeArrayDataGenetator";
import {
  amber,
  green,
  indigo,
  lightGreen,
  red,
} from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import UserOverviewComponent from "./UserOverviewComponent";
import { GetPost, GetUser } from "../../../utils/blogRequest";

import ReactReadMoreReadLess from "react-read-more-read-less";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { blogGet } from "../../../Controller/BlogController";
import { useHistory } from "react-router-dom";

// import ListSection from "./ListSection";

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


export default function Dashboard({setLoginStatus}) {
  const history =useHistory();
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const [authors, setauthors] = useState([]);
  const [blogPostData, setBlogPostData] = useState([]);

  // useEffect(()=>{
  //     const auth = localStorage.getItem("user-info");
  //     if(auth){
  //       history.push("/Dashboard"); 
  //       // setLoginStatus(true)
  //     }
  //   },[])

  const showblog = async () => {
    let data = await blogGet();
    if (data.status === 200) {
      // setLoginStatus(false);
      // console.log(blogdata)
      setBlogPostData(data.data);
    }
  };
  useEffect(()=>{
    showblog();
  },[])
  // setLoginStatus(false)
  let sno=0;
  const DisplayData = [
    {
      label: "Post",
      value: randomValueGenerator({ digit: 1000 }),
      // icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Pages",
      value: randomValueGenerator({ digit: 100 }),
      // icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "New Visitor",
      value: randomValueGenerator({ digit: 100 }),
      // icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
    {
      label: "Total visitor",
      value: randomValueGenerator({ digit: 1000 }),
      // icon: <ArrowDropDownIcon />,
      iconLabel: "30%",
    },
  ];

  const GraphCardData = [
    {
      id: "Post",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: blue[500],
      bgColor: blue[50],
    },
    {
      id: "Pages",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: indigo[500],
      bgColor: indigo[50],
    },
    {
      id: "New Visitor",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: lightGreen[500],
      bgColor: lightGreen[50],
    },
    {
      id: "Total visitor",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: amber[500],
      bgColor: amber[50],
    },
  ];

  useEffect(() => {
    if (!fetched) {
      GraphCardData.map((item, i) =>
        DisplayCardGraph({
          id: item.id,
          data: item.data,
          brColor: item.brColor,
          bgColor: item.bgColor,
        })
      );
      setFetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);

  // for api calling
  useEffect(() => {
    if (!fetched) {
      GetPost({ limit: 5 }).then(({ data: { data } }) => {
        setPosts(data);
      });
      GetUser({ limit: 5 }).then(({ data: { data } }) => {
        setauthors(data);
      });
      setFetched(true);
    }
  }, [fetched]);

  return (
    <Box>
      {/* section title
      section card
      section graph
      section posts */}

      <PageHeader label="Dashboard" />
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <Typography margin="auto">Post</Typography>
            <CardContent>
              {"10"}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
        <Card>
            <Typography margin="auto">Request</Typography>
            <CardContent>
              {"5"}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
        <Card>
            <Typography margin="auto">Aprove</Typography>
            <CardContent>
              {"3"}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
        <Card>
            <Typography margin="auto">Category</Typography>
            <CardContent>
              {"6"}
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}

      <Grid container spacing={1}>
        {DisplayData.map((item, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Card>
              <CardContent className={classes.cardContent}>
                <canvas
                  id={item.label}
                  className={classes.displayCardGraph}></canvas>
                <Typography variant='body2' className={classes.cardLabel}>
                  {item.label}
                </Typography>
                <Typography
                  variant='h5'
                  component='h6'
                  className={classes.cardTitle}>
                  {item.value}
                </Typography>
                <Typography
                  component='p'
                  style={{
                    textAlign: "center",
                    marginBottom: "0px",
                  }}>
                  <Button
                    size='small'
                    className={classes.ratioBtn}
                    startIcon={item.icon}
                    style={{
                      color: item.label[0] === "P" ? green[600] : red[500],
                    }}>
                    {item.iconLabel}
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container style={{marginTop:20}}>
          <Grid item xs={12}>
            <TableContainer component={Paper} style={{ maxHeight: 450 }}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead style={{ bachgroundcolor: "red" }}>
                  <TableRow>
                    <StyledTableCell >S.No</StyledTableCell>
                    <StyledTableCell >Title</StyledTableCell>
                    <StyledTableCell >Sub title</StyledTableCell>
                    <StyledTableCell >Description</StyledTableCell>
                    <StyledTableCell >Category</StyledTableCell>
                    <StyledTableCell>Image</StyledTableCell>
                    {/* <TableCell align="center">Aouther</TableCell> */}
                    <StyledTableCell>Date/Time</StyledTableCell>
                    <StyledTableCell> Active </StyledTableCell>
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
                              {/* <img src="logo.jpg.png" alt={"no image"} style={{width: 100, height: 200}} /> */}
                            </TableCell>
                            <StyledTableCell >
                              {"Date"}
                            </StyledTableCell>
                            
                            <StyledTableCell >{"true"}</StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      );
                    })
                  : null}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

      {/* <UserOverviewComponent /> */}

      {/* <ListSection posts={posts} authors={authors} /> */}
    </Box>
  );
}
