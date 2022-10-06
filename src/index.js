import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { HashRouter, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
// Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { PrivateRoute } from "Helpers/Auth";
import { SetupAxios } from "Helpers/Auth";
import ShowCard from "layouts/auth/ShowCard";

// Array.prototype.move = function (from, to) {
//   this.splice(to, 0, this.splice(from, 1)[0]);
// };

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <SetupAxios />
        <Switch>
          <Route path="/card/:cardId" component={ShowCard} />

          <PrivateRoute path={`/auth`} isPublic={true}>
            <Route path={`/auth`} component={AuthLayout} />
          </PrivateRoute>
          
          <PrivateRoute path="/card/:cardId" availableToAll >
            <Route path={`/card`} component={AuthLayout} />
          </PrivateRoute>

          <PrivateRoute path={`/services`} isPublic={true}>
            <Route path={`/services`} component={AuthLayout} />
          </PrivateRoute>

          <PrivateRoute path={`/admin`} isPublic={false}>
            <Route path={`/admin`} component={AdminLayout} />
          </PrivateRoute>

          <Redirect from='/' to='/admin' />
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
