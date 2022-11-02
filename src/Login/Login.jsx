import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useEffect } from "react";
const Login = ({ handleChange,setLoginStatus }) => {
  const history = useHistory();

  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userSubmit = () => {

   
    const userData = {
      userName: userName,
      password: password,
    };
    if(userName ==='admin' && password==='123456'){
    alert('user login');
    setUserName('');
    setPassword('');
    history.push("/Dashboard");
    setLoginStatus(false)
    }else{
      alert("invalid user name and password") 
    }
  };

  // if(localStorage.getItem("user-info")){
  //   history.push("/Dashboard");
  // }
  // useEffect(()=>{

  // },[])

  const userinput=(event)=>{
   let user_name = event.target.value;
    setUserName(user_name)
  }

  const userPassword=(event)=>{
    let user_password = event.target.value;
    setPassword(user_password)
  }

  return (
    <Grid>
      <form action="">
      <Paper style={paperStyle}>
        <Grid align="center" item sm={12}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          variant="outlined"
          size="small"
          placeholder="Enter username"
          value={userName}
          onChange={userinput}
          fullWidth
          required
          style={{ marginBottom: 10, marginTop: 10 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={userPassword}
          fullWidth
          required
          style={{ marginBottom: 10 }}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={() => userSubmit()}
        >
          Sign in
        </Button>
        {/* <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography> */}
        <Typography>
          {" "}
          Do you have an account ?
          <Link to ="/Singup" onClick={() => handleChange("event", 1, history.push("/Singup"))}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
      </form>
    </Grid>
  );
};

export default Login;
