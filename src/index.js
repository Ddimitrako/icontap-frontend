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
import { isAuth } from "Helpers/Auth";
import { PrivateRoute } from "Helpers/Auth";
import { getAuth } from "Helpers/Auth";

const axios = require('axios').default;

if (isAuth()) {
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${getAuth()}`;
      return config;
    }
  );

  axios.interceptors.request.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status == 401) {
      window.location.href = '/admin/logout';
    }

    if (error.response.status == 403) {
      window.location.href = '/';
    }
  }
  );
}
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Switch>

          <PrivateRoute path={`/auth`} isPublic={true}>
            <Route path={`/auth`} component={AuthLayout} />
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
