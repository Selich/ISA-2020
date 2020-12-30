import path from "path";
import { ConnectionOptions } from "typeorm";



export default
    {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    logging: true,
    username: 'super_isa',
    password: 'pass',
    database: 'isa',
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [ "dist/entities/**/*.js", ]
    // entities: [Patient, Appointment, Medicine, ,Address]
  } as ConnectionOptions;
