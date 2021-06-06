import path from "path";
import { ConnectionOptions } from "typeorm";
import "dotenv-safe/config"

export default
    {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [ "dist/entities/**/*.js", ]
    } as ConnectionOptions;
