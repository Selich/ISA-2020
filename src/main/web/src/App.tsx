import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  CSSReset,
  ThemeProvider,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

import Login from "./pages/Login";
import Landing from "./pages/Landing"

const newTheme = {
  ...theme,
  sm: "360px",
  md: "768px",
  lg: "1024px",
  xl : "1440px"
};

export const App = () => (
  <ChakraProvider theme={newTheme}>
    <CSSReset/>
    <Router>
      <Switch>
            <Route path="/">
              <Login />
            </Route>
            <Route path="/login">
              <Landing />
            </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)
