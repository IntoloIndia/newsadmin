import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import {
  Typography,
  TextField,
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  RadioButton,
} from "@material-ui/core/";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createBlogPost } from "../../Controller/BlogController";
import { categoryGet } from "../../Controller/CategoryController";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Controller, useForm } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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

const Blogs = () => {
  // const { control, handleSubmit, error } = useForm();
  const [open, setOpen] = useState(false);

  const [blog_title, setBlog_Title] = useState("");
  const [blog_Sub_Title, setBlog_Sub_Title] = useState("");
  const [aouther, setAouther] = useState("");
  const [post_image, setPost_Image] = useState();
  const [blog_Discription, setDlog_Discription] = useState("");
  const [categorylist, setCategoryList] = useState([]);
  const [publish_Date, setPublish_Date] = useState("");
  const [selectCategory, setSelectCategory] = useState('')
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');


  

  
  // get api category
  const categaory = async () => {
    let data = await categoryGet();
    if (data.status === 200) {
      setCategoryList(data.data);
    }
  };
  useEffect(() => {
    categaory();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (e) => {
  //   e.preventdefault();
  //   console.log(e.target.value);
  //   setCategoryList(e.target.value);
  // };

  const onSubmit = async () => {
    const data = new FormData()
    data.append('image',post_image)
     data.set('blog_title',blog_title)
     data.set('blog_subTitle',blog_Sub_Title)
     data.set('blog_dsc',blog_Discription)
    fetch('http://192.168.0.99:4500/api/blogs',{
      method: 'post',
      body:data,
    })
    .then((result)=>{
        console.log(result)
        alert("data save & file sent sucessfully");
        // showblog();
    }).then((error)=>{
        console.log("file not upload",error);
    });
    // data.append(' blog_title',blog_title)
    // data.append('blog_subTitle',blog_Sub_Title)
    // data.append('blog_Discription',blog_Discription)
  // const blogdata = {
  //   blog_title:blog_title,
  //   blog_subTitle:blog_Sub_Title,
  //   blog_dsc:blog_Discription,
  //   // image:post_image,
  // };
  // console.log(data,blogdata);

  // let result = await createBlogPost(blogdata,data);
  // if(result.status===200){
  //     alert('blog create');
  // };
  }
  



  return (
    <Box>
      <Button onClick={handleClickOpen} size="small">
        Blog
      </Button>
      <Dialog open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Post
        </DialogTitle>
        <Paper elevation={10}>
          <DialogContent dividers>
            <Box>
              <form encType="multipart/form-data">
               
                    <TextField
                      variant="outlined"
                      style={{ marginBottom: 10 }}
                      size="small"
                      fullWidth
                      label="Title"
                     
                      onChange={(e)=>setBlog_Title(e.target.value)} 
                      
                    />
                  
                    <TextField
                      variant="outlined"
                      style={{ marginBottom: 10 }}
                      size="small"
                      fullWidth
                      label="Aouther"
                      // value={value}
                      onChange={(e)=>setAouther(e.target.value)} 
                     
                    />
                  
                  <TextField
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    size="small"
                    fullWidth
                    label="subTitle"
                    multiline
                    rows={2}
                    // value={value}
                    onChange={(e)=>setBlog_Sub_Title(e.target.value)} 
                    
                  />
               
                  <TextField
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    size="small"
                    multiline
                    rows={4}
                    fullWidth
                    label="blog_dsc"
                   
                    // value={value}
                    onChange={(e)=>setDlog_Discription(e.target.value)} 
                   
                  />
                
                  <TextField
                    type="file"
                    variant="outlined"
                    style={{ marginBottom: 10 }}
                    size="small"
                    fullWidth
                    name="blog_image"
                    // value={value}
                    onChange={(e)=>setPost_Image(e.target.files[0])}
                     
                  />
                
                {/* <FormControl
                  style={{ marginBottom: 10 }}
                  size="small"
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel id="demo-select-small">Category</InputLabel>
                 
                      <Select label="category" fullWidth onChange={(e)=>setSelectCategory(e.target.value)}>
                        {categorylist.map((option, index) => (
                          <MenuItem key={index} value={option._id}>
                            {option.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                  
                </FormControl> */}
                {/* <FormControl component="fieldset">
                  <FormLabel component="legend">Post publish</FormLabel>

                
                      <RadioGroup aria-label="gender" row>
                        <FormControlLabel
                          value="Publish"
                          control={<Radio color="primary" onChange={(e)=>setPublish_Date(e.target.value)}/>}
                          label="Publish"
                        />
                        <FormControlLabel
                          value="Customs Publish"
                          control={<Radio color="primary" onChange={(e)=>setPublish_Date(e.target.value)}/>}
                          label="Customs Publish"
                        />
                      </RadioGroup>
                    {/* )}
                    name="blog post"
                    control={control}
                  /> */}
                {/* </FormControl> */} 
              
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker"
                        label="Date picker"
                        format="dd/MM/yyyy"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                       
                      />
                   
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        // value={time}
                        // onChange={(e)=>setTime(e.target.value)}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                        
                      />
                
                </MuiPickersUtilsProvider> */}

                <DialogActions>
                  <Button  variant="contained" color="secondary"  onClick={()=>onSubmit()}>
                    Save
                  </Button>
                </DialogActions>
              </form>
            </Box>
          </DialogContent>
        </Paper>
      </Dialog>
    </Box>
  );
};
export default Blogs;

{
  /* <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                  >
                  <Controller
                    name="Post"
                    control={control}
                    render={({ field }) => {
                      <Radio {...field} />;
                    }}
                  />
                  </RadioGroup>
                 
                </FormControl> */
}
{
  /* <div>
                  <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, ...props } }) => (
                      <RadioButton
                        onChange={(e) => onChange(e.target.checked)}
                        {...props}
                        label={label}
                      />
                    )}
                  />
                </div> */
}
