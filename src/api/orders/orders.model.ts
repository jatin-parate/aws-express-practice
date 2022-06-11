import { Schema, model, Document, ObjectId } from 'mongoose';

export interface OrdersData {
  data: Record<string, unknown>;
  shop: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrdersDocument extends Document<ObjectId>, OrdersData {}

const ordersSchema = new Schema<OrdersData>(
  {
    data: Schema.Types.Mixed,
    shop: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Orders = model<OrdersData>('Orders', ordersSchema);

export default Orders;
