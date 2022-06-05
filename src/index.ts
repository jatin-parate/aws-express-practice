import dotEnv from 'dotenv';
import { resolve } from 'node:path';

dotEnv.config({
  path: resolve(`.env.${process.env.NODE_ENV}`),
});

// eslint-disable-next-line import/first
import app from './app';

let port: number = parseInt(process.env.PORT as string, 10);

if (!port || Number.isNaN(port)) {
  port = 3000;
}

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
