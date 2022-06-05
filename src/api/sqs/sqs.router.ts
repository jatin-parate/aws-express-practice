import { Router } from 'express';
import { createMessageHandler, getMessageHandler } from './sqs.controller';

const sqsRouter = Router();

sqsRouter.route('/').get(getMessageHandler).post(createMessageHandler);

export default sqsRouter;
