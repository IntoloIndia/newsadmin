import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Card,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../Common/CommonComponent";
import { useStyles } from "./BodyStyles";
import Categarypopup from "./Categarypopup";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  categoryGet,
  categoryDelete,
  createCategorypost,
  categoryGetParentData,
  updateCategory,
} from "../../Controller/CategoryController";
import { countryGet } from "../../Controller/CountryController";
import { textAlign } from "@mui/system";
import { CardContent } from "@mui/material";
import { subcategoryGet, subcreateCategorypost } from "../../Controller/SubCategoryController";

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

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

const Categarylist = () => {
  // get data state
  const [categorydata, setCategoryData] = useState([]);
  const [category_name, setCategoryName] = useState("");
  const [slugName, setSlugName] = useState("");
  const [updatemodal, setUpdateModal] = useState(false);
  const [category_id, setCategory_Id] = useState("");

  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState([])
  const [subCategoryName, setSubCategoryName] = useState('')
  const [subCategorySlugName, setSubCategorySlugName] = useState('')

  const classes = useStyles();

  const categaories = async () => {
    let data = await categoryGet();
    // console.log(data)
    setCategoryData(data.data);
  };

  useEffect(() => {
    categaories();
  }, []);

  const deleteCategory = async (id) => {
    let data = await categoryDelete(id);
    alert("This category delete ");
    categaories();
  };

  const update = (id, name, sname) => {
    setCategory_Id(id);
    setCategoryName(name);
    setSlugName(sname);
    setUpdateModal(true);
  };
  console.log(category_name, category_id);

  const categaryUpdate = async () => {
    const updaetData = {
      category_name: category_name,
      slug: slugName,
    };
    //  alert(JSON.stringify(updaetData))
    let data = await updateCategory(category_id, updaetData);
    if (data.status === 200) {
      alert("category update");
      setCategoryName("");
      setSlugName("");
      categaories();
      setUpdateModal(false);
    } else {
      alert("category not update");
    }
  };

  const saveData = async () => {
    const categoryData = {
      category_name: category_name,
      slug: slugName,
    };
    // alert(JSON.stringify(categoryData))
    let data = await createCategorypost(categoryData);
    if (data.status === 200) {
      alert("save category");
      setCategoryName("");
      setSlugName("");
      categaories();
    } else {
      alert("data not save");
    }
  };


  // subcategory api 

  const saveSubCategory = async ()=>{
    const subcategroydata ={
      category_id:category,
      sub_category_name:subCategoryName,
      sub_category_slug_name:subCategorySlugName,
    }
    alert(JSON.stringify(subcategroydata))
    let data = await subcreateCategorypost(subcategroydata);
      if(data.status===200){
      alert("subcategory save")
      setCategory('')
      setSubCategoryName('')
      setSubCategorySlugName('')
      subCategory();
      
    }else{
      alert("subcategory not save")
    }
  }

  const subcategories = async ()=>{
    let data = await subcategoryGet();
    if(data.status===200){
      console.log(data);
      setSubCategory(data.data)
    }
  }

  useEffect(()=>{
    subcategories()
  },[])

  var sno = 0;
  return (
    <>
      <Box>
        <div className={classes.boxcantainer}>
          <PageHeader label="Categarylist" />
          {/* <Categarypopup /> */}
        </div>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" style={{ marginBottom: 10 }}>
                    Category
                  </Typography>
                  <TextField
                    variant="outlined"
                    label="Category_name"
                    size="small"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    value={updatemodal ? category_name : null}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    label="Slug_name"
                    size="small"
                    fullWidth
                    // style={{ marginBottom: 10 }}
                    value={updatemodal ? slugName : null}
                    onChange={(e) => setSlugName(e.target.value)}
                  />
                </CardContent>
                <CardActions>
                  {!updatemodal ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => saveData()}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => categaryUpdate()}
                    >
                      Update
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} lg={9}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead style={{ bachgroundcolor: "red" }}>
                    <TableRow>
                      <StyledTableCell align="center">S.No</StyledTableCell>
                      <StyledTableCell align="center">Category</StyledTableCell>
                      <StyledTableCell align="center">Slug</StyledTableCell>
                      <StyledTableCell align="center">
                        Posting Date
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Last Updation Date
                      </StyledTableCell>
                      <StyledTableCell align="center">Edit</StyledTableCell>
                      <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  {categorydata.map((ele, index) => {
                    return (
                      <TableBody key={index}>
                        <TableRow>
                          <TableCell align="center">{++sno}</TableCell>
                          <TableCell align="center">
                            {ele.category_name}
                          </TableCell>
                          <TableCell align="center">{ele.slug}</TableCell>
                          <TableCell align="center">Posting Date</TableCell>
                          <TableCell align="center">
                            Last updation Date
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              <EditIcon
                                onClick={() =>
                                  update(ele._id, ele.category_name, ele.slug)
                                }
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              variant="contained"
                              color="secondary"
                              size="small"
                            >
                              <DeleteIcon
                                onClick={() => deleteCategory(ele._id)}
                              />
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
        <Box style={{ marginTop: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" style={{ marginBottom: 10 }}>
                    SubCategory
                  </Typography>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="demo-controlled-open-select-label">
                      Category
                    </InputLabel>
                    <Select
                      fullWidth
                      label="Category"
                      style={{ marginBottom: 10 }}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categorydata.map((data, index) => (
                        <MenuItem value={data._id}>
                          {data.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    label="Subcategory_name"
                    size="small"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    label="Slug"
                    size="small"
                    fullWidth
                    onChange={(e) => setSubCategorySlugName(e.target.value)}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>saveSubCategory("save")}
                  >
                    Save
                  </Button>
                </CardActions>
              </Card>
            </Grid>
           
              <Grid item xs={12} lg={9}>
               <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={3}>
                    <Typography variant="h6" style={{ marginBottom: 10 }}>
                    Sub categaories
                  </Typography>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="demo-controlled-open-select-label">
                        Select category
                    </InputLabel>
                    <Select
                      fullWidth
                      label=" Select category"
                      style={{ marginBottom: 10 }}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categorydata.map((data, index) => (
                        <MenuItem value={data._id}>
                          {data.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={9}>
                          <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table" size="small">
                  <TableHead style={{ bachgroundcolor: "red" }}>
                    <TableRow>
                      <StyledTableCell align="center">S.No</StyledTableCell>
                      <StyledTableCell align="center">Category</StyledTableCell>
                      <StyledTableCell align="center">Slug</StyledTableCell>
                      <StyledTableCell align="center">
                        Posting Date
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Last Updation Date
                      </StyledTableCell>
                      <StyledTableCell align="center">Edit</StyledTableCell>
                      <StyledTableCell align="center">Delete</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  {subCategory.map((ele, index) => {
                    return (
                      <TableBody key={index}>
                        <TableRow>
                          <TableCell align="center">{++sno}</TableCell>
                          <TableCell align="center">
                            {ele.category_name}
                          </TableCell>
                          <TableCell align="center">{ele.slug}</TableCell>
                          <TableCell align="center">Posting Date</TableCell>
                          <TableCell align="center">
                            Last updation Date
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              <EditIcon
                                onClick={() =>
                                  update(ele._id, ele.category_name, ele.slug)
                                }
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              variant="contained"
                              color="secondary"
                              size="small"
                            >
                              <DeleteIcon
                                onClick={() => deleteCategory(ele._id)}
                              />
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
                 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Categarylist;
