import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs } from "../src/resolvers/types";
import { resolvers } from "../src/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlTestCall = async (
  query: any,
  variables?: any,
  userId?: number | string
) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  );
};