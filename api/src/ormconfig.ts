import { __prod__ } from "./constants";
import { ConnectionOptions } from "typeorm";
import path from "path";

export default
    {
    type: process.env.DATABASE_TYPE,
    host: 'localhost',
    port: 5432,
    logging: true,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    synchronize: !!process.env.ORM_SYNC,
  } as ConnectionOptions;
