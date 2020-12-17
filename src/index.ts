import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from './mikro-orm.config';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { UserResolver } from "./resolvers/user";
import { RegisterInput } from "./resolvers/types/UserTypes";
import { User } from "./entities/User";


const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express()
  // const user = orm.em.create(User, {
  //   email: "selicsh@gmail.com",
  //   password: "1234",
  //   confirmPassword: "1234",
  //   role: "patient",
  //   firstName: "Nikola",
  //   lastName: "Selic",
  //   gender: "Male",
  //   dateOfBirth: "12/12/1994",
  //   street: "street",
  //   city: "Paracin",
  //   country: "Serbia",
  //   telephone: "1243123123"
  // })
  // await orm.em.persistAndFlush(user);


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })

  });

  apolloServer.applyMiddleware({ app });

  app.get('/', (req,res) => {
    res.send('test');
  });
  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  })
  // const users = await orm.em.find(User, {})
  // console.log(users);
};


main().catch( err => console.log(err));
