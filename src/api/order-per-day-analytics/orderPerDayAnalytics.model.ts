import { model, Schema } from 'mongoose';

interface OrderPerDayAnalyticsData {
  shop: string;
  date: Date;
  amount: number;
}

const orderPerDayAnalyticsSchema = new Schema<OrderPerDayAnalyticsData>({
  shop: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const OrderPerDayAnalytics = model<OrderPerDayAnalyticsData>(
  'OrderPerDayAnalytics',
  orderPerDayAnalyticsSchema,
);

export default OrderPerDayAnalytics;
