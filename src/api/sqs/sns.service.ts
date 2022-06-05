import SNS from 'aws-sdk/clients/sns';

const sns = new SNS();

export const publish = async () =>
  sns
    .publish({
      TopicArn: process.env.AWS_SNS_ORDER_TOPIC_ARN!,
      Message: JSON.stringify({
        orderId: '123',
        orderStatus: 'pending',
      }),
    })
    .promise();
