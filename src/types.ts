import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response} from 'express'
import { Redis } from 'ioredis';
import { createUserLoader } from "./utils/createUserLoader";

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
  redis: Redis
  userLoader: ReturnType<typeof createUserLoader>
  // @ts-ignore
  req: Request & { session: Express.Session };
  res: Response
}
