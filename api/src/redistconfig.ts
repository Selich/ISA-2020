import redis from 'redis';
import connectRedis from 'connect-redis'
import session from 'express-session';

const RedisStore = connectRedis(session)
const redisClient = redis.createClient()

export default {
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
      },
      secret: 'somesecret',
      resave: false
	}
