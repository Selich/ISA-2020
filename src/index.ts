import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from './entities/User';
import microConfig from './mikro-orm.config';


const main = async () => {
  const orm = await MikroORM.init(microConfig);


  await orm.getMigrator().up();
  const user =  orm.em.create(User, {
    email: 'selich.work@gmail.com',
    password: 'pass',
    firstName: 'Nikola',
    lastName: 'Selic',
    gender: 'M',
    dateOfBirth: new Date('12/12/2020')
  });


  const users = await orm.em.find(User, {})
  console.log(users);
};


main().catch( err => console.log(err));
