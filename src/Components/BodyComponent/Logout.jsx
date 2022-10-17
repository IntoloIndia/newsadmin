import React from "react";
import {
  Box,
  CardContent,
  Paper,
  Card,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import {useHistory} from 'react-router-dom'

export default function Logout({setLoginStatus}) {
  const history = useHistory()

  const userLogout=()=>{
    setLoginStatus(true);
    history.push('/SignInOutContainer')
  }
  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <Box margin='auto'>
            <Card>
              <Typography>User login</Typography>
            </Card>
              <Button variant="contained" color="primary" onClick={()=>userLogout()}>Logout</Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
