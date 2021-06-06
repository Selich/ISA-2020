import { ChakraProvider } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Provider as AuthProvider } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { createClient, Provider } from "urql";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { Loading } from "../components/Loading";
import { Header } from "../components/sections/Header";
import "../datepicker.css";
import { useMeQuery } from "../generated/graphql";
import theme from "../theme";
import Index from "./index";

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL,
});

const allowedRoutes = ["/pharmacies", "/shop", "fstlogin", "/index"];

const roles = {
  employees: ["pharm", "derm", "admin", "sysadmin"],
  all: ["patient", "pharm", "derm", "admin", "sysadmin"],
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let token = Cookies.get("token");

  let [user, setUser] = useState(null);
  let body = null;
  if (!token) body = <Header setUser={setUser} user={user} />;
  let [{ fetching, data }] = useMeQuery({
    variables: {
      token: token,
    },
  });

  let allowed = false;
  if (fetching) body = <Loading />;
  else if (!data) body = <Loading />;
  else {
    setUser(data.me);
    body = <Header setUser={setUser} user={user} />;

    console.log(router.pathname)
  if (
    allowedRoutes.includes(router.pathname) ||
    router.pathname.startsWith("/" + user.role) ||
    user.role === 'undefined'
  ) {
  }
  }
   allowed = true;

  const ComponentToRender = allowed ? Component : Index;
  return (
    <AuthProvider session={pageProps.session}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
      />
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
