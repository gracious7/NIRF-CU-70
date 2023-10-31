


import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";

import theme from "theme/theme.js";
import './styles.css';

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Redirect from={`/`} to="/admin/landingpage" />
      </Switch>
    </HashRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
