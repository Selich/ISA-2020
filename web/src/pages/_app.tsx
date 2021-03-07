import { ChakraProvider } from '@chakra-ui/react';
import { Provider as AuthProvider } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { createClient, Provider } from "urql";
import { Header } from '../components/sections/Header';
import theme from '../theme';
import Index from './index';

const client = createClient({
  url: "http://localhost:4000/graphql",
});

function MyApp({ Component, pageProps }) {
  let [user, setUser] = useState(null)
  let allowed = true;

  useEffect(() => { }, [user])

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
