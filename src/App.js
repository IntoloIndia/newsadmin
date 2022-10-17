import { BrowserRouter,Redirect,useHistory } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./Components/Header/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";
import SignInOutContainer from "./SignInOutContainer";
import { useState } from "react";
function App() {
  const history =useHistory()
  const [loginStatus, setLoginStatus] = useState(true)

  return (
    <>  
    <BrowserRouter>
  {
   loginStatus ?
    <SignInOutContainer setLoginStatus={setLoginStatus} />
   :
    <><HeaderComponent setLoginStatus={setLoginStatus}/><FooterComponent /></>
  }
    </BrowserRouter> 
    </>
  );
}

export default App;
