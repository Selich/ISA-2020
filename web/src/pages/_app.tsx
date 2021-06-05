import { ChakraProvider } from "@chakra-ui/react";
import { Provider as AuthProvider } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient, Provider } from "urql";
import { Header } from "../components/sections/Header";
import theme from "../theme";
import Cookies from "js-cookie";
import Index from "./index";
import { usePatientQuery } from "../generated/graphql";

import '../datepicker.css'
import '../../node_modules/react-big-calendar/lib/css/react-big-calendar.css'





const client = createClient({
  url: "http://localhost:4000/graphql",
});
const allowedRoutes = ["/pharmacies", "/shop"];

const roles = {
  employees: ["pharm", "derm", "admin", "sysadmin"],
  all: ["patient", "pharm", "derm", "admin", "sysadmin"],
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let [user, setUser] = useState(null);
  let allowed = true


  const ComponentToRender = allowed ? Component : Index;
  return (
    <AuthProvider session={pageProps.session}>
      <link rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css" />
      <Provider value={client}>
        <ChakraProvider resetCSS theme={theme}>
          <Header setUser={setUser} user={user} />
          <ComponentToRender user={user} {...pageProps} />
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
