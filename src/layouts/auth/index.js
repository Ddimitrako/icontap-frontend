import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";

// Chakra imports
import { Box } from "@chakra-ui/react";
// Layout components
import { SidebarContext } from "contexts/SidebarContext";
import SignIn from "views/auth/signIn/SignInDefault";
import SignUp from "views/auth/signUp/SignUpDefault";
import ForgotPassword from "views/auth/forgotPassword/ForgotPasswordDefault";
import VerifyEmail from "./VerifyEmail";
import Settings from "views/admin/main/profile/settings/components/Password";
import ResetPassword from "views/admin/main/profile/settings/components/ResetPassword";

// Custom Chakra theme
export default function Auth() {
  // states and functions
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  
  return (
    <>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}>
          <Box
            float='right'
            minHeight='100vh'
            height='100%'
            position='relative'
            w='100%'
            transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
            transitionDuration='.2s, .2s, .35s'
            transitionProperty='top, bottom, width'
            transitionTimingFunction='linear, linear, ease'>
              <Box mx='auto' minH='100vh'>
                <Switch>

                  <Route path="/auth/sign-in">
                    <SignIn />
                  </Route>

                  
                  <Route path="/auth/sign-up">
                    <SignUp />
                  </Route>
                  
                  <Route path="/auth/verify">
                    <VerifyEmail />
                  </Route>
                  
                  <Route path="/auth/forgot-password">
                    <ForgotPassword />
                  </Route>

                  <Route path="/services/reset-password/:token">
                    <ResetPassword reset />
                  </Route>

                  <Redirect
                    from='/auth'
                    to='/auth/sign-in/default
                  '
                  />
                </Switch>
              </Box>
          </Box>
        </SidebarContext.Provider>
      </Box>
    </>
  );
}
