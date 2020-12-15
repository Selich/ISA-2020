import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  CSSReset,
  ThemeProvider,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing"

const newTheme = {
  ...theme,
  sm: "360px",
  md: "768px",
  lg: "1024px",
  xl: "1440px"
};

export const App = () => (
  <ChakraProvider theme={newTheme}>
    <CSSReset />
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)
