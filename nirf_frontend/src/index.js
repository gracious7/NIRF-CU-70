


import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js"; // Chakra imports
import { ChakraProvider } from "@chakra-ui/react";

import theme from "theme/theme.js";
import './styles.css';
import RankTable from "components/Tables/RankTable";
import LandingPage from "views/LandingPage/LandingPage";

ReactDOM.render(
  <ChakraProvider theme={theme} resetCss={false} position="relative">
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/rtl`} component={RTLLayout} />
        <Route path={`/table`} component={RankTable} />
        {/* <Route path={`/`} component={LandingPage} /> */}
        <Redirect from={`/`} to="/admin/landingpage" />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
