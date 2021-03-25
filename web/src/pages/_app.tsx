import { ChakraProvider } from '@chakra-ui/react';
import { Provider as AuthProvider } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient, Provider } from "urql";
import { Header } from '../components/sections/Header';
import theme from '../theme';
import Cookies from 'js-cookie'
import Index from './index';
import { usePatientQuery } from "../generated/graphql";

const client = createClient({
  url: "http://localhost:4000/graphql",
});
const allowedRoutes = [
  '/pharmacies', '/shop'
]

const roles = {
  'employees': ['pharm', 'derm', 'admin', 'sysadmin'],
  'all': ['patient','pharm', 'derm', 'admin', 'sysadmin'],
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let [user, setUser] = useState(null)
  let token = Cookies.get('token')

  let allowed = false


  if(allowedRoutes.includes(router.pathname)){
    console.log(router.pathname)
    allowed = true
  }
  if(token){
    let [{fetching, data}] = usePatientQuery({variables:{
      token: token
    }})
    if(data) user = data.patient

    if(user){
      if(roles.all.includes(user.role) && router.pathname.startsWith('/patient')){
          allowed = true
      }
    }
  }

  useEffect(() => { }, [user, token])

  const ComponentToRender = allowed ? Component : Index;
  return (
    <AuthProvider session={pageProps.session}>
      <Provider value={client}>
        <ChakraProvider resetCSS theme={theme}>
          <Header setUser={setUser} user={user} />
          <ComponentToRender  {...pageProps} />
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
