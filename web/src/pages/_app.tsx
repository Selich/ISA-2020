import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Header } from '../components/sections/Header'
import { Provider, createClient, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
import { Provider as AuthProvider } from 'next-auth/client'
import { useRouter } from "next/router";
import { addItem, editItem, removeItem } from '../utils/cart'




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
import Denied from './denied'
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  let role = ""
  let isEnabled = false
  let allowed = true;
	if(data){ 
		localStorage.setItem('user', JSON.stringify(data.me))
		role = data.me.role
		role = data.me.isEnabled
	}
	if (router.pathname.startsWith("/user") && role !== "patient")   {
		if(role === "patient" && isEnabled == false){
			allowed = false;
		}
	}
  const ComponentToRender = allowed ? Component : Denied;
  return (
    <AuthProvider session={pageProps.session}>
    <Provider value={client}>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Header/>
        <ComponentToRender {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
    </Provider>
    </AuthProvider>
  )
}

export default MyApp
