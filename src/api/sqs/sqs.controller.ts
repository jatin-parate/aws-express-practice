import type { RequestHandler } from 'express';
import {
  deleteMessage,
  getMessage,
  sendMessage,
  startConsumer,
} from './sqs.service';

startConsumer(async (msg) => {
  console.info('Message received', msg);
});

export const getMessageHandler: RequestHandler = async (req, res) => {
  const sqsResult = await getMessage();
  if (!sqsResult.Messages?.length) {
    res.sendStatus(404);
    return;
  }
  const [message] = sqsResult.Messages!;
  res.json(sqsResult.Messages![0]);
  await deleteMessage(message.ReceiptHandle!);
};

export const createMessageHandler: RequestHandler = async (req, res) => {
  const result = await sendMessage(JSON.stringify(req.body));

  res.json(result);
};
