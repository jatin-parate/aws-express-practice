import { Router } from 'express';
import todosRouter from './todos/todos.router';
// import sqsRouter from './sqs/sqs.router';

const apiRouter = Router();

apiRouter.use('/todos', todosRouter);

// apiRouter.use('/sqs', sqsRouter);

export default apiRouter;
