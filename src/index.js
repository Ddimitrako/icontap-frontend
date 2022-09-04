import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
// Chakra imports
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { isAuth } from "Helpers/Auth";
import { PrivateRoute } from "Helpers/Auth";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>


          <PrivateRoute path={`/auth`} isPublic={true}>
            <Route path={`/auth`} component={AuthLayout} />
          </PrivateRoute>

          <PrivateRoute path={`/admin`} isPublic={false}>
            <Route path={`/admin`} component={AdminLayout} />
          </PrivateRoute>

          <Redirect from='/' to='/admin' />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
