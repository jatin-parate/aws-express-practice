import type { RequestHandler } from 'express';
import { publish } from './sns.service';
import {
  getApproxNumberOfMessages,
  sendMessage,
  startConsumer,
} from './sqs.service';

startConsumer(async (msg) => {
  console.info('Message received', JSON.parse(msg.Body!));
});

export const getMessageHandler: RequestHandler = async (req, res) => {
  res.json({ total: parseInt(await getApproxNumberOfMessages(), 10) || 0 });
};

export const createMessageHandler: RequestHandler = async (req, res) => {
  const result = await sendMessage(JSON.stringify(req.body));

  res.json(result);
};

export const sendNotificationOnTopic: RequestHandler = async (req, res) => {
  res.json(await publish());
};
