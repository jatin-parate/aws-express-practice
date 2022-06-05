import SQS from 'aws-sdk/clients/sqs';

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

export default sqs;
