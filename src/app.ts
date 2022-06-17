import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import apiRouter from './api/api.router';
import { errorHandlerMiddleware } from './utils/middlewares/error-handler';

const app = express();
app.use(cors());
app.use(json());
app.use('/api', apiRouter);
app.use(errorHandlerMiddleware);

export default app;
