import React from "react";
import { Redirect, Route } from "react-router-dom";
import App from "../App";
import HeaderComponent from "./Header/HeaderComponent";

// function ProtectedRoute(props) {
  function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("user-info");
  console.log("this", isAuthenticated);
  // console.log("this", props.test('child data'));

  return (
    <>
    {/* <App dataFromChild={isAuthenticated}/> */}
      <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" /> 
      }
      />
    </>
  );
}
// const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (auth) return <Component {...props} />;
//         if (!auth)
//           return (
//             <Redirect to={{ path: "/", state: { from: props.location } }} />
//           );
//       }}
//     />
//   );
// };

export default ProtectedRoute;