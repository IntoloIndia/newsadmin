import React, { useEffect, useState,useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { useStyles } from "./BodyStyles";
import { PageHeader } from "../Common/CommonComponent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  countryGet,
  createcountrypost,
  deleteCountrydata,
  CouyntryUpdate,
} from "../../Controller/CountryController";


const StateCity = () => {
  const classes = useStyles;
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [country_id, setCountry_Id] = useState('');
  const [countryName, setCountryName] = useState("");
  const [countryList, setCountryList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdateModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   post api country
  const submit = async () => {
    const countrydata = {
      country_name: countryName,
    };
    let data = await createcountrypost(countrydata);
    if (data.status === 200) {
      alert("create country ");
      setCountryName("");
      country_list();
    }
    setOpen(false);
  };

  // get api country

  const country_list = async () => {
    let data = await countryGet();
    if (data.status === 200) {
      setCountryList(data.data);
    } else {
      console.log("list not found");
    }
  };

  useEffect(() => {
    country_list();
  }, []);

  const deleteCountry = async (country_id) => {
    let data = await deleteCountrydata(country_id);
    if (data.status === 200) {
      alert("This country delete");
      country_list();
    }
  };

  const updateCountry = (country_id, name) => {
    // console.log(country_id)
    setUpdateModal(true);
    setOpen(true);
    setCountryName(name);
    setCountry_Id(country_id);
    // console.log(id)
  };

  const updateCountryname = async () => {
    const countryupdate = {
      country_name:countryName,
    };
    let data = await CouyntryUpdate(country_id,countryupdate);
    if (data.status === 200) {
      alert("country update");
      setUpdateModal(false);
      setOpen(false);
      country_list();
    }
  };

  return (
    <Box className={classes.section}>
      <PageHeader label="State" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Box>
            <Paper>
              <Card>
                <CardContent>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <Typography variant="h6">Country</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleClickOpen}
                    >
                      Add
                    </Button>

                    <Dialog
                      open={open}
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
                          Country
                        </DialogTitle>
                        <IconButton>
                          {/* <DeleteIcon fontSize="large" /> */}
                          <CloseIcon fontSize="middem" onClick={handleClose} />
                        </IconButton>
                      </Box>
                      <hr />
                      <DialogContent>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          label="Country"
                          value={updateModal ? countryName : null}
                          onChange={(e) => setCountryName(e.target.value)}
                        />
                      </DialogContent>
                      <hr />
                      <DialogActions>
                        {!updateModal ? (
                          <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => submit()}
                          >
                            save
                          </Button>
                        ) : (
                          <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => updateCountryname()}
                          >
                            Update
                          </Button>
                        )}
                      </DialogActions>
                    </Dialog>
                  </Box>
                  <hr />
                  {countryList != undefined
                    ? countryList.map((ele, index) => {
                        return (
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="h6">
                              {ele.country_name}
                            </Typography>
                            <Box>
                              <IconButton
                                color="primary"
                                onClick={() =>
                                  updateCountry(ele._id, ele.country_name)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={() => deleteCountry(ele._id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        );
                      })
                    : null}
                </CardContent>
              </Card>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Typography>api{process.env.REACT_APP_API_URL}</Typography>
    </Box>
  );
};

export default StateCity;
