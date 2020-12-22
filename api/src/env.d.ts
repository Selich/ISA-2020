declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_TYPE: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_DATABASE: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    DOMAIN: string;
    CORS_ORIGIN: string;
  }
}
