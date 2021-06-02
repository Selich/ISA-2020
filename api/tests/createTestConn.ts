import { createConnection } from "typeorm";

export const createTestConn = async () =>
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "isa_super",
    password: "pass",
    database: "isa_test",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ["../src/entities/**/*"]
  });