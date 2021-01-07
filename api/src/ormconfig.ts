import path from "path";
import { ConnectionOptions } from "typeorm";



export default
    {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    logging: true,
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    // url: 'postgres://super_user:pass@localhost:5432/isa_test',
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [ "dist/entities/**/*.js", ]
    // entities: [Patient, Appointment, Medicine, ,Address]
  } as ConnectionOptions;
