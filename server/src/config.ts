import 'dotenv/config';

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  APP_BACKEND_PREFIX: process.env.APP_BACKEND_PREFIX,

  PORT: process.env.PORT,

  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGODB_URL: process.env.MONGODB_URL,
};
