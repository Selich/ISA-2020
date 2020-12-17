import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from './mikro-orm.config';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from "./resolvers/user";
import { RegisterInput } from "./resolvers/types/UserTypes";
import { User } from "./entities/User";
import { MedicineResolver } from "./resolvers/medicine";
import cors from 'cors';


const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ em: orm.em, req , res })

  });

  apolloServer.applyMiddleware({
    app,
    cors: false
  });
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  )

  app.get('/', (req,res) => {
    res.send('test');
  });
  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  })

};


main().catch( err => console.log(err));
