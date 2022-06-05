import express, { json } from 'express';
import 'express-async-errors';
import apiRouter from './api/api.router';

const app = express();

app.use(json());

app.use('/api', apiRouter);

export default app;
