import dotEnv from 'dotenv';
import { connect } from 'mongoose';
import http from 'node:http';
import { resolve } from 'node:path';
import AWS from 'aws-sdk';

dotEnv.config({
  path: resolve(`.env.${process.env.NODE_ENV}`),
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
  maxRetries: 3,
});

// eslint-disable-next-line import/first
import app from './app';

let port: number = parseInt(process.env.PORT as string, 10);

if (!port || Number.isNaN(port)) {
  port = 3000;
}

const server = http.createServer(app);

const cleanUp = () => {
  if (server.listening) {
    server.close((err) => {
      console.info('Server stopped listening');

      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  } else {
    process.exit(0);
  }
};

connect(process.env.MONGO_DB_URL!).then(() => {
  server.listen(port, () => {
    console.info(`Server is running on port ${port}`);

    process.on('SIGUSR2', cleanUp);

    process.on('SIGINT', cleanUp);
  });
});
