import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { Provider as AuthProvider } from 'next-auth/client'
import { useRouter } from "next/router";




function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if(!result.register)
                  return null

                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

import theme from '../theme'
import { LogoutMutation, LoginMutation, RegisterMutation, MeDocument, MeQuery, useMeQuery } from '../generated/graphql';
import Index from './index';


function MyApp({ Component, pageProps }) {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  let role = ""
  let allowed = true;
  if(data){ role = data.me.role }
  if (router.pathname.startsWith("/patient") && role !== "patient") {
    allowed = false;
  }
  const ComponentToRender = allowed ? Component : Index;
  return (
    <AuthProvider session={pageProps.session}>
    <Provider value={client}>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <ComponentToRender {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
    </Provider>
    </AuthProvider>
  )
}

export default MyApp
