import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

export default function BasicTable() {
  const { control, handleSubmit } = useForm();
  const [name, setname] = useState("");
  const [fileimage, setfileimage] = useState("");

  const onSubmit = async (e) => {
    const imagedata ={
      post_image:fileimage
    }
    console.log(imagedata)
    // const data ={
    //   name:name,
    //   fileimage:fileimage
    // }
    //  await fetch('http://localhost:4500/api/upload', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name:name,
    //       fileimage:fileimage
    //     })
    //   })
    //   .then((response) => response.json())
    //     .then((json) => {
    //      console.log(json)
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  };

  return (
    <Grid container>
      <Grid item xs={4}>
        <Paper>
          <Box>
            {/* <Typography variant="h5">Form</Typography>
            <form  encType="multipart/form-data">
              <TextField
              fullWidth
               name="title"
               onChange={(e)=>setname(e.target.value)}
               />
               <TextField 
                type="file" 
                name='uploaded_fil'
                onChange={(e)=>setfileimage(e.target.files[0])}
               />
              </form> */}

            <form  enctype="multipart/form-data">
              <input type="file" name="Post_image" onChange={(e)=>setfileimage(e.target.files[0])} />
              <Button  onClick={()=>onSubmit()}>save</Button>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );

  // const [image, setImage] = useState({ preview: '', data: '' })
  // const [status, setStatus] = useState('')

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   let formData = new FormData()
  //   formData.append('file', image.data)
  //   const response = await fetch('http://localhost:4500/api/image', {
  //     method: 'POST',
  //     body: formData,

  //   })
  //   if (response) setStatus(response.statusText)
  //   // .then((response) => {
  //   //   console.log(response);
  //   // })
  //   // .catch((error) => {
  //   //   console.error('Error: ', error);
  //   // });
  // }

  // const handleFileChange = (e) => {
  //   const img = {
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     data: e.target.files[0],
  //   }
  //   setImage(img)
  // }

  // console.log(image)
  // // alert(JSON.stringify(image))
  // return (
  //   <div className='App'>
  //     <h1>Upload to server</h1>
  //     {image.preview && <img src={image.preview} width='100' height='100' />}
  //     <hr></hr>
  //     <form onSubmit={handleSubmit}>
  //       <input type='file' name='file' onChange={handleFileChange}></input>
  //       <button type='submit'>Submit</button>
  //     </form>
  //     {status && <h4>{status}</h4>}
  //   </div>
  // )
}
