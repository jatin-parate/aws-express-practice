import { Router } from 'express';
import {
  createMessageHandler,
  getMessageHandler,
  sendNotificationOnTopic,
} from './sqs.controller';

const sqsRouter = Router();

sqsRouter.route('/').get(getMessageHandler).post(createMessageHandler);

sqsRouter.post('/sns', sendNotificationOnTopic);

export default sqsRouter;
