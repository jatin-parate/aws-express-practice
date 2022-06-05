import type { RequestHandler } from 'express';
import {
  getApproxNumberOfMessages,
  sendMessage,
  startConsumer,
} from './sqs.service';

startConsumer(async (msg) => {
  console.info('Message received', msg);
});

export const getMessageHandler: RequestHandler = async (req, res) => {
  res.json({ total: parseInt(await getApproxNumberOfMessages(), 10) || 0 });
};

export const createMessageHandler: RequestHandler = async (req, res) => {
  const result = await sendMessage(JSON.stringify(req.body));

  res.json(result);
};
