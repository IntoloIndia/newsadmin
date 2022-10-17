import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Table,
} from "@material-ui/core";
import { PageHeader } from "../../Common/CommonComponent";
import { useStyles } from "../BodyStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import { createAdminPost, getRole, getAdmindata,updateAdmindata,deleteAdmindata } from "../../../Controller/AdminController";

const Admin = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [adminUpdateModal, setadminUpdateModal] = useState(false)
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState('');
  const [roledata, setRoleData] = useState([])
  const [admindata, setAdminData] = useState([])
  const [userid, setUserId] = useState('')


  const handleClickOpen = () => {
    setOpen(true);
    setadminUpdateModal(false)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createAdmin = async () => {
    const userData = {
      role_id: userRole,
      name: name,
      user_name:userName,
      password:password,
    };
    // console.log(userData)
    let data = await createAdminPost(userData);
    if(data.status===200){
      alert(' admin data  create ');
      setName('');
      setUserName('');
      setUserName('');
      setUserRole('')
      setPassword('');
      show_Admin_Data()
    };
    setOpen(false)
  };

  const adminRole = async ()=>{
    let data = await getRole();
    if(data.status ===200){
      setRoleData(data.data)
    }
  }

  const show_Admin_Data = async ()=>{
    let data = await getAdmindata();
    if(data.status ===200){
      setAdminData(data.data)
    }
  }

  useEffect(()=>{
    adminRole()
    show_Admin_Data()
  },[])



  const update =(id,role,name,userName,password)=>{
  //  console.log(id,name,role,username,password)
    setadminUpdateModal(true)
    setOpen(true)
    setUserId(id);
    setUserRole(role);
    setName(name);
    setUserName(userName);
    setPassword(password)
  }

  // console.log(userid)

  const deleteData = async (userid)=>{
    let data = await deleteAdmindata(userid)
    if(data.status===200){
      alert("delete data ")
      show_Admin_Data();
    }
  }

  const updateadmin = async()=>{
   const udateData ={
    role_id: userRole,
    name: name,
    user_name:userName,
    password:password,
   };
   
   let data = await updateAdmindata(userid,udateData);
   console.log(data)
   if(data.status===200){
     alert(' update data  ');
     setOpen(false);
     setadminUpdateModal(false);
     show_Admin_Data();
   }
   setOpen(false)
  }

  var sn = 0;
  return (
    <Box>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 5 }}>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClickOpen}
        >
          Create
        </Button>
      </div>
      <form>
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
            <DialogTitle id="alert-dialog-title">Create Admin</DialogTitle>
            <IconButton>
              {/* <DeleteIcon fontSize="large" /> */}
              <CloseIcon fontSize="middem" onClick={handleClose} />
            </IconButton>
          </Box>
          <hr />
          <DialogContent>
            <FormControl
              style={{ marginBottom: 10 }}
              size="small"
              fullWidth
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-label">Roll</InputLabel>
              <Select 
                fullWidth
                label="Roll"
                value={adminUpdateModal?userRole:userRole.role}
                onChange={(e)=>setUserRole(e.target.value)}
              >
                {roledata!= undefined ? 
                roledata.map((ele,index)=>(
                    <MenuItem key={index} value={ele._id}>{ele.role}</MenuItem>
                  )):null}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              style={{ marginBottom: 10 }}
              variant="outlined"
              size="small"
              label="name"
              value={adminUpdateModal ? name:null}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              style={{ marginBottom: 10 }}
              variant="outlined"
              size="small"
              label="username"
              value={adminUpdateModal ? userName:null}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              type="password"
              fullWidth
              style={{ marginBottom: 10 }}
              variant="outlined"
              size="small"
              label="password"
              value={adminUpdateModal ? password:null}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <hr />
          <DialogActions>
            {!adminUpdateModal ?
            <Button
              variant="contained"
              color="secondary"
              onClick={() => createAdmin()}
            >
              save
            </Button>:
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>updateadmin()}
            >
              update
            </Button>}
          </DialogActions>
        </Dialog>
      </form>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Paper>
              <Box style={{ marginTop: 5 }}>
                <Grid container>
                  <Grid item xs={12}>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">S.No</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">UserName</TableCell>
                            <TableCell align="center">Password</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          { admindata!= undefined ?
                            admindata.map((ele,index)=>(
                              <TableRow key={index} >
                              <TableCell align="center">{++sn}</TableCell>
                              <TableCell align="center">{ele.role_id}</TableCell>
                              <TableCell align="center">{ele.name}</TableCell>
                              <TableCell align="center">{ele.user_name}</TableCell>
                              <TableCell align="center">{ele.password}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                >
                                 <EditIcon onClick={()=>{update(ele._id,ele.role_id,ele.name,ele.user_name,ele.password)}} />
                                </IconButton>
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                >
                                 <DeleteIcon onClick={()=>deleteData(ele._id)} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                            ))
                          :null}
                          
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {/* <Typography>react{process.env.REACT_APP_API_URL}</Typography> */}
    </Box>
  );
};

export default Admin;
