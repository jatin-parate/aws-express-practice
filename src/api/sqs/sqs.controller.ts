import type { RequestHandler } from 'express';
import { record } from '../order-per-day-analytics/orderPerDayAnalytics.service';
import Orders from '../orders/orders.model';
import { publish } from './sns.service';
import {
  getApproxNumberOfMessages,
  sendMessage,
  startConsumer,
} from './sqs.service';

startConsumer(async (msg) => {
  const {
    detail: { payload: order, metadata },
  } = JSON.parse(msg.Body!);
  const shop = metadata['X-Shopify-Shop-Domain'];
  const isTest = metadata['X-Shopify-Test'];
  if (isTest) {
    return;
  }
  order.created_at = new Date(order.created_at);
  order.updated_at = new Date(order.updated_at);
  const oldOrder = await Orders.findOneAndUpdate(
    { 'data.id': order.id, shop, 'data.updatedAt': { $lt: order.updatedAt } },
    { data: order, shop },
    { upsert: true },
  );
  const oldTotal = Number.parseFloat(
    oldOrder!.data.current_total_price as string,
  );
  const newTotal = Number.parseFloat(order.current_total_price);

  await record(shop, oldTotal === newTotal ? newTotal : newTotal - oldTotal);
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
