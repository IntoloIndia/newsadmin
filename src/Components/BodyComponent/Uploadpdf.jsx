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
    FormControlLabel,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { PageHeader } from '../Common/CommonComponent'
import { useStyles } from './BodyStyles'
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { getPdfUpload, pdfdataDelete } from "../../Controller/PdfUploadController";
// import DeleteIcon from "@material-ui/icons/Delete";
// import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

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

const Uploadpdf = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [pdfUpdateModal, setPdfUpdateModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState('');
    const [uploadfiles, setUploadFiles] = useState()
    const [pdfData, setPdfData] = useState([])
    const [pdfData_id, setPdfData_Id] = useState('')

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const handleClickOpen = () => {
        setOpen(true);
        setPdfUpdateModal(false)
    };
    const handleClose = () => {
        setOpen(false);
    };

    const saveFilesData = async () => {
        const data = new FormData();
        data.append("filedata", uploadfiles);
        data.set("date", selectedDate);
        await fetch(`${process.env.REACT_APP_API_URL}pdfupload`, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Cantent-Type": "application/json"
            },
            body: data,
        }).then((result) => {
            result.json().then((res) => {
                console.log("res", res)
                alert("save data")
                uploadpdfdta();
            });
        })
        setOpen(false);
    }

    const uploadpdfdta = async () => {
        let data = await getPdfUpload();
        if (data.status === 200) {
            // console.log(data)
            setPdfData(data.data)
        } else {
            alert("data not found")
        }
    }
    useEffect(() => {
        uploadpdfdta()
    }, [])

    const deleteData = async (id) => {
        let data = await pdfdataDelete(id);
        if (data.status === 200) {
            alert("delete")
            uploadpdfdta();
        } else {
            alert("file not delete")
        }
    }

    const update = (id, pdffile, date) => {
        setSelectedDate(date);
        setUploadFiles(pdffile)
        setPdfData_Id(id);
        setPdfUpdateModal(true);
        setOpen(true);
    }

    console.log(pdfData_id)

    const updatepdf = async () => {
        const data = new FormData();
        data.append("filedata", uploadfiles);
        data.set("date", selectedDate);
        await fetch(`${process.env.REACT_APP_API_URL}pdfupload/`+pdfData_id, {
            method: "put",
            headers: {
                "Accept": "application/json",
                "Cantent-Type": "application/json"
            },
            body: data,
        }).then((result) => {
            result.json().then((res) => {
                console.log("res", res)
                alert("update")
                uploadpdfdta();
            });
        })
        setOpen(false);
    
    }



    let sno = 0;
    return (
        <Box>
            <div className={classes.boxcantainer}>
                <PageHeader label="upload file" />

                <Box>
                    <div
                        style={{ display: "flex", justifyContent: "flex-end", margin: 5 }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
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
                                Upload files
                            </DialogTitle>
                            <IconButton>
                                {/* <DeleteIcon fontSize="large" /> */}
                                <CloseIcon fontSize="middem" onClick={handleClose} />
                            </IconButton>
                        </Box>
                        <hr />
                        <DialogContent>
                            <form>
                                
                                    <TextField
                                        type='file'
                                        variant="outlined"
                                        style={{ marginBottom: 10 }}
                                        size="small"
                                        fullWidth
                                        accept=".pdf"
                                        // value={pdfUpdateModal ?uploadfiles :null}
                                        onChange={(e) => setUploadFiles(e.target.files[0])}
                                    />
                                     { pdfUpdateModal?
                                    <TextField
                                        
                                        variant="outlined"
                                        style={{ marginBottom: 10 }}
                                        size="small"
                                        fullWidth
                                        
                                        value={pdfUpdateModal ? uploadfiles : null}
                                    // onChange={(e)=>setUploadFiles(e.target.files[0])}
                                    />:null}
                                

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    {/* <Grid container justifyContent="space-around"> */}

                                    <KeyboardDatePicker
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        id="date-picker-dialog"
                                        // label="Date picker dialog"
                                        format="dd/MM/yyyy"  //asgdfhS
                                        value={pdfUpdateModal ? selectedDate :selectedDate.selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />

                                    {/* </Grid> */}
                                </MuiPickersUtilsProvider>

                                <DialogActions>
                                    {!pdfUpdateModal ?

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => saveFilesData()}
                                        >
                                            Save
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => updatepdf()}
                                        >
                                            update
                                        </Button>
                                    }
                                </DialogActions>
                            </form>
                        </DialogContent>
                    </Dialog>
                </Box>
            </div>
            <Box style={{ marginTop: 5 }}>
                <Grid container>
                    <Grid item xs={12} lg={12}>
                        <TableContainer component={Paper} style={{ maxHeight: 600 }}>
                            <Table
                                className={classes.table}
                                stickyHeader
                                aria-label="sticky table"
                                size="small"
                            >
                                <TableHead style={{ bachgroundcolor: "red" }}>
                                    <TableRow>
                                        <StyledTableCell >S.No</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Date/Time</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    pdfData.map((ele, index) => (
                                        <TableBody>
                                            <StyledTableRow key={index}>
                                                <StyledTableCell>{++sno}</StyledTableCell>
                                                <StyledTableCell>{ele.upload_pdf_files}</StyledTableCell>
                                                {/* <StyledTableCell><img src= {ele.upload_pdf_files} alt="image not found"/></StyledTableCell> */}
                                                <StyledTableCell>{ele.date}</StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                    >
                                                        <EditIcon
                                                            onClick={() => {
                                                                update(ele._id, ele.upload_pdf_files, ele.date)
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                    >
                                                        <DeleteIcon onClick={() => deleteData(ele._id)} />
                                                    </IconButton>
                                                </StyledTableCell>


                                            </StyledTableRow>
                                        </TableBody>
                                    ))
                                }
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
            <img src="logo192.png" alt="no image" srcset="" width="200" />
        </Box>
    )
}

export default Uploadpdf