import dotEnv from 'dotenv';

dotEnv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
