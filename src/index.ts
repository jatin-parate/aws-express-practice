import dotEnv from 'dotenv';
import app from './app';

dotEnv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

let port: number = parseInt(process.env.PORT as string, 10);

if (!port || Number.isNaN(port)) {
  port = 3000;
}

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
