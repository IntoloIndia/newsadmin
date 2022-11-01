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
  CardContent,
  CardActions,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../Common/CommonComponent";
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
import { categoryGet } from "../../../Controller/CategoryController";
import Multiselect from "multiselect-react-dropdown";
import { CheckBox } from "@material-ui/icons";
import {
  createnavigationCategorypost,
  navigationCategoryDelete,
  navigationGetcategory,
  navigationupdateCategory,
} from "../../../Controller/NavigationController";

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

export default function Appnav() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [naviUpdateModal, setNaviUpdateModal] = useState(false);
  const [categorylist, setCategoryList] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [number, setNumber] = useState("");
  const [showNavigation, setShowNavigation] = useState([]);
  const [navigation_id, setNavigation_Id] = useState("");

  const postCategory = async () => {
    let data = await categoryGet();
    if (data.status === 200) {
      setCategoryList(data.data);
    }
  };

  const navigationCategory = async () => {
    let data = await navigationGetcategory();
    // console.log(data)
    if (data.status === 200) {
      setShowNavigation(data.data);
    }
  };

  useEffect(() => {
    postCategory();
    navigationCategory();
  }, []);

  const save = async () => {
    let navidata = {
      category_id: selectCategory,
      category_number: number,
    };
    // alert(JSON.stringify(navidata))
    let data = await createnavigationCategorypost(navidata);
    if (data.status === 200) {
      alert("data create");
      setSelectCategory("");
      setNumber("");
      navigationCategory();
    } else {
      alert("data not create");
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setNaviUpdateModal(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deletenavigation = async (navigation_id) => {
    let data = await navigationCategoryDelete(navigation_id);
    if (data.status === 200) {
      alert("delete");
      navigationCategory();
    } else {
      alert("not delete");
    }
  };

  const update = (id, name, number) => {
    setNavigation_Id(id);
    setSelectCategory(name);
    setNumber(number);
    setOpen(true);
    setNaviUpdateModal(true);
  };

  const naviupdate = async () => {
    let naviupdatedata = {
      category_id: selectCategory,
      category_number: number,
    };
    let data = await navigationupdateCategory(navigation_id, naviupdatedata);
    if (data.status === 200) {
      alert("data create");
      setSelectCategory("");
      setNumber("");
      navigationCategory();
    } else {
      alert("data not create");
    }
    setOpen(false);
  };

  // const postCategory = async () => {
  //   let categoryData = [];
  //   let data = await categoryGet();
  //   // console.log(data)
  //       for (let i = 0; i < data.data.length; i++) {
  //           categoryData.push(data.data[i].category_name)

  //       }
  //       console.log(categoryData)
  //     setCategoryList(categoryData);
  // };

  var sno = 0;
  return (
    <Box>
      <div className={classes.boxcantainer}>
        <PageHeader label="navigation" />

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
              <DialogTitle id="alert-dialog-title">
                create navigation
              </DialogTitle>
              <IconButton>
                {/* <DeleteIcon fontSize="large" /> */}
                <CloseIcon fontSize="middem" onClick={handleClose} />
              </IconButton>
            </Box>
            <hr />
            <DialogContent>
              <form>
                <FormControl
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    fullWidth
                    label="Category"
                    value={
                      naviUpdateModal
                        ? selectCategory
                        : selectCategory.selectCategory
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
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  label="Title"
                  value={naviUpdateModal ? number : null}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <hr />
                <DialogActions>
                  {!naviUpdateModal ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => save()}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => naviupdate()}
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
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TableContainer component={Paper} style={{ maxHeight: 300 }}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table"
                size="small"
              >
                <TableHead style={{ bachgroundcolor: "red" }}>
                  <TableRow>
                    <StyledTableCell align="center">S.No</StyledTableCell>
                    <StyledTableCell align="center">
                      category name
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      category slug
                    </StyledTableCell>
                    <StyledTableCell align="center">number</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                {showNavigation.map((ele, index) => (
                  <TableBody>
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">{++sno}</StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.category_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.category_slug}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {ele.category_number}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <EditIcon
                            onClick={() => {
                              update(
                                ele._id,
                                ele.category_id,
                                ele.category_number
                              );
                            }}
                          />
                        </IconButton>

                        <IconButton
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          <DeleteIcon
                            onClick={() => deletenavigation(ele._id)}
                          />
                        </IconButton>
                      </StyledTableCell>
                      {/* <StyledTableCell align="center">
                        <IconButton
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          <DeleteIcon
                            onClick={() => deletenavigation(ele._id)}
                          />
                        </IconButton>
                      </StyledTableCell> */}

                    </StyledTableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
// style={{maxHeight: 300,}}
