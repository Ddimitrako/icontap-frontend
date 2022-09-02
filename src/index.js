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

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route path={`/admin`} component={AdminLayout} />
          <Redirect from='/' to='/admin' />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
