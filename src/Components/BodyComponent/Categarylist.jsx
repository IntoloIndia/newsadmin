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
import {
  categoryGet,
  categoryDelete,
  createCategorypost,
  categoryGetParentData,
} from "../../Controller/CategoryController";
import { countryGet } from "../../Controller/CountryController";
// import { DataGrid } from '@mui/x-data-grid';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Categarylist = () => {
  // const [open, setOpen] = useState(false);
  const [categary, setCategary] = useState("");
  const [categorydata, setCategoryData] = useState([]);
  const [category_id, setCategory_Id] = useState("");


  const [category_name, setCategoryName] = useState("");
  const [slug_name, setSlugName] = useState("");
  const [parentName, setParentName] = useState(null)
  const [parentData, setParentData] = useState([])
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const categaory = async () => {
    let data = await categoryGet();
    // console.log(data)
    setCategoryData(data.data);
  };
  
  
  const categaoryParentData = async () => {
    let data = await categoryGetParentData();
    // console.log(data)
    setParentData(data.data);

  };
  
  useEffect(() => {
    categaory();
  }, []);

  useEffect(() => {
    categaoryParentData();
  }, []);

  const deleteCategory = async (id) => {
    // let data = await categoryDelete(id);
    // alert("This category delete ");
    // categaory();
  };

  const update = (id, name) => {
    setOpen(true);
    setCategory_Id(id);
    setCategary(name);
  };
  console.log(categary, category_id);

  const categaryUpdate = () => {
    alert("update");
  };

  const saveData = async () => {
    const categoryData = {
     category_name:category_name,
     slug_name:slug_name,
     parent_id:parentName,
  };
  alert(JSON.stringify(categoryData))
  let data = await createCategorypost(categoryData)
  if(data.status===200){
    alert("save category");
    setCategoryName('');
    setSlugName('');
    setParentName('');
    categaory();
  }else{
    alert("data not save")
  }
}

  var sno = 0;
  return (
    <>
      <Box>
        <div className={classes.boxcantainer}>
          <PageHeader label="Categarylist" />
          <Categarypopup />
        </div>
        <Box style={{ marginTop: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={5}>
              <Paper elevation={10}>
                <Typography>Category</Typography>
                <Box style={{ margin: 20 }}>
                  <TextField
                    variant="outlined"
                    label="Categoryname"
                    size="small"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    label="slugname"
                    size="small"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    onChange={(e) => setSlugName(e.target.value)}
                  />
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="demo-controlled-open-select-label">
                      Select
                    </InputLabel>
                    <Select
                      // labelId="demo-controlled-open-select-label"
                      // id="demo-controlled-open-select"
                    
                      onChange={(e) => setParentName(e.target.value)}
                      fullWidth
                      variant="outlined"
                      label="select"
                      size="small"
                      style={{ marginBottom: 10 }}
                    >{
                      categorydata.map((ele)=>(
                      // console.log(ele)
                        <MenuItem value={ele._id}>{ele.category_name}</MenuItem>
                      ))
                    }
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginBottom: 10 }}
                    fullWidth
                    onClick={() => saveData()}
                  >
                    Save
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Box style={{ width: "100%", height: "100%", borderWidth: 2 }}>
                <Paper elevation={10}>
                  <Typography variant="h5">Category List</Typography>

                  {/* <nav>
                  <ul style={{listStyle:"none"}}>
                    <li> <Checkbox />India 
                  <ul style={{marginLeft:30,listStyle:"none"}}><li> <Checkbox />MadhyaPradesh 
                    <ul style={{marginLeft:50,listStyle:"none"}}>
                      <li> <Checkbox /> Indore</li>
                      <li> <Checkbox /> Bhopal</li>
                      <li> <Checkbox />Jabalpur</li>
                    </ul>
                    </li>
                    </ul>
                  </li>
                  <ul style={{marginLeft:30,listStyle:"none"}}><li> <Checkbox />UtterPradesh 
                    <ul style={{marginLeft:50,listStyle:"none"}}>
                      <li> <Checkbox />Vihar</li>
                     
                    </ul>
                    </li>
                    </ul>
                  
                  </ul>
                 
                  </nav> */}
                  {
                    parentData.map((element,index)=>(
                      <Box key={index}>
                        <Typography key={index} >{++sno}{""+element.parent_id}</Typography>
                      </Box>
                    ))
                  }
                  
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <div>
          {/* <Button onClick={handleClickOpen} variant='outlined'>
        AddCategary
      </Button> */}
          {/* <Dialog open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              UpdateCateagry
            </DialogTitle>
            <DialogContent dividers>
              <form>
                <Box>
                  <TextField
                    placeholder="Categary name"
                    id="outlined-basic"
                    label="Categarynames"
                    variant="outlined"
                    size="small"
                    value={categaory}
                    onChange={(e) => setCategary(e.target.value)}
                    fullWidth
                  />
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={() => categaryUpdate()}
              >
                update
              </Button>
            </DialogActions>
          </Dialog> */}
        </div>
      </Box>
    </>
  );
};

export default Categarylist;
