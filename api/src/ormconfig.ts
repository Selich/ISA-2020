import path from "path";
import { ConnectionOptions } from "typeorm";


export default
    {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    logging: true,
    username: 'isa_super',
    password: 'pass',
    database: 'isa_super',
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [ "dist/entities/**/*.js", ]
    } as ConnectionOptions;
