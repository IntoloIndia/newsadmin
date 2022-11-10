import { BrowserRouter, Redirect, Route, useHistory } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./Components/Header/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import SignInOutContainer from "./SignInOutContainer";
import { useEffect, useState } from "react";
import Login from "./Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import useAuth from "./Components/useAuth";
function App({dataFromChild}) {
  const history = useHistory()
  const [isAuth, login, logout] = useAuth(false)
  const [loginStatus, setLoginStatus] = useState(false)

// console.log(dataFromChild)
  // useEffect(()=>{
  //   const auth = localStorage.getItem("user-info");
  //   if(auth){
  //          history.push("/Dashboard");

  //   }
  // },[])

  
  return (
    <>
      <BrowserRouter>
      {/* { loginStatus ?
          <Route exact path='/' render={() => <Login />} />: */}

      {/* //  ? <Login  setLoginStatus={setLoginStatus} /> : */}
        <>
        <HeaderComponent />
        <FooterComponent />
        </>

      {/* } */}
      </BrowserRouter>
    </>
  );
}

export default App;



