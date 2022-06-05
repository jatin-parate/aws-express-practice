import SQS from 'aws-sdk/clients/sqs';
import { Consumer } from 'sqs-consumer';
import { ConsumerOptions } from 'sqs-consumer/dist/consumer';

const sqs = new SQS({
  region: process.env.AWS_SQS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const sendMessage = async (message: string) =>
  sqs
    .sendMessage({ QueueUrl: process.env.AWS_SQS_URL!, MessageBody: message })
    .promise();

export const deleteMessage = async (receiptHandle: string) =>
  sqs
    .deleteMessage({
      QueueUrl: process.env.AWS_SQS_URL!,
      ReceiptHandle: receiptHandle,
    })
    .promise();

export const getMessage = async () =>
  sqs
    .receiveMessage({
      VisibilityTimeout: Number.parseInt(
        process.env.AWS_SQS_VISIBILITY_TIMEOUT_SECONDS!,
        10,
      ),
      QueueUrl: process.env.AWS_SQS_URL!,
      MaxNumberOfMessages: 1,
    })
    .promise();

export const startConsumer = (
  handleMessage: ConsumerOptions['handleMessage'],
) => {
  const app = new Consumer({
    queueUrl: process.env.AWS_SQS_URL!,
    handleMessage,
    handleMessageBatch: async (messages) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const message of messages) {
        // eslint-disable-next-line no-await-in-loop
        await handleMessage!(message);
      }
    },
    batchSize: 1,
    visibilityTimeout: Number.parseInt(
      process.env.AWS_SQS_VISIBILITY_TIMEOUT_SECONDS!,
      10,
    ),
    sqs,
  });

  app.on('error', (err) => {
    console.error(err);
  });

  app.on('processing_error', (err, msg) => {
    console.error(err, { msg });
  });

  app.start();

  return app;
};

export default sqs;
