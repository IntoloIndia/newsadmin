import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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
  Table,
} from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import {
  createAdminPost,
  getRole,
  getAdmindata,
  updateAdmindata,
  deleteAdmindata,
} from "../../../Controller/AdminController";
import { withStyles } from "@material-ui/core/styles";

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

const Admin = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [adminUpdateModal, setadminUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [roledata, setRoleData] = useState([]);
  const [admindata, setAdminData] = useState([]);
  const [userid, setUserId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setadminUpdateModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createAdmin = async () => {
    const userData = {
      role_id: userRole,
      name: name,
      user_name: userName,
      password: password,
    };
    // console.log(userData)
    let data = await createAdminPost(userData);
    if (data.status === 200) {
      alert(" admin data  create ");
      setName("");
      setUserName("");
      setUserName("");
      setUserRole("");
      setPassword("");
      show_Admin_Data();
    }
    setOpen(false);
  };

  const adminRole = async () => {
    let data = await getRole();
    if (data.status === 200) {
      setRoleData(data.data);
    }
  };

  const show_Admin_Data = async () => {
    let data = await getAdmindata();
    if (data.status === 200) {
      setAdminData(data.data);
    }
  };

  useEffect(() => {
    adminRole();
    show_Admin_Data();
  }, []);

  const update = (id, role, name, userName, password) => {
    //  console.log(id,name,role,username,password)
    setadminUpdateModal(true);
    setOpen(true);
    setUserId(id);
    setUserRole(role);
    setName(name);
    setUserName(userName);
    setPassword(password);
  };

  // console.log(userid)

  const deleteData = async (userid) => {
    let data = await deleteAdmindata(userid);
    if (data.status === 200) {
      alert("delete data ");
      show_Admin_Data();
    }
  };

  const updateadmin = async () => {
    const udateData = {
      role_id: userRole,
      name: name,
      user_name: userName,
      password: password,
    };

    let data = await updateAdmindata(userid, udateData);
    console.log(data);
    if (data.status === 200) {
      alert(" update data  ");
      setOpen(false);
      setadminUpdateModal(false);
      show_Admin_Data();
    }
    setOpen(false);
  };

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
                value={adminUpdateModal ? userRole : userRole.role}
                onChange={(e) => setUserRole(e.target.value)}
              >
                {roledata != undefined
                  ? roledata.map((ele, index) => (
                      <MenuItem key={index} value={ele._id}>
                        {ele.role}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              style={{ marginBottom: 10 }}
              variant="outlined"
              size="small"
              label="name"
              value={adminUpdateModal ? name : null}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              style={{ marginBottom: 10 }}
              variant="outlined"
              size="small"
              label="username"
              value={adminUpdateModal ? userName : null}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              type="password"
              fullWidth
              style={{ marginBottom: 10 }}
              variant="outlined"
              size="small"
              label="password"
              value={adminUpdateModal ? password : null}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DialogContent>
          <hr />
          <DialogActions>
            {!adminUpdateModal ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => createAdmin()}
              >
                save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => updateadmin()}
              >
                update
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </form>

      <Box style={{ marginTop: 5 }}>
        <Grid container>
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
                    <StyledTableCell align="center">Role</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">User name</StyledTableCell>
                    {/* <StyledTableCell align="center">Password</StyledTableCell> */}
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admindata != undefined
                    ? admindata.map((ele, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="center">
                            {++sn}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.role}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {ele.user_name}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">
                            {ele.password}
                          </StyledTableCell> */}
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
                                    ele.role_id,
                                    ele.name,
                                    ele.user_name,
                                    ele.password
                                  );
                                }}
                              />
                            </IconButton>
                            <IconButton
                              variant="contained"
                              color="secondary"
                              size="small"
                            >
                              {/* <DeleteIcon onClick={() => deleteData(ele._id)} /> */}
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;
