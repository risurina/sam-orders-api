import { unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBStreamEvent, DynamoDBRecord } from 'aws-lambda';
import { getOrderById } from '../../services/order-services';
import { updateItem as _updateOrder } from '../../services/dynamo/orders';
import { Job } from '../../types/jobs';

export const handlers = async (event: DynamoDBStreamEvent) => {
  console.debug('event', JSON.stringify(event));
  const { Records } = event;

  const promises = Records.map(handleRecord);
  const resolutions = await Promise.allSettled(promises);
  const failures = resolutions.filter((r) => r.status === 'rejected');
  if (failures.length) {
    console.error(`${failures.length} records failed`);
    console.error(failures.map((r) => (r as PromiseRejectedResult).reason));
  }
  console.debug('DONE: lambdaHandler()');
};

export const handleRecord = async (record: DynamoDBRecord) => {
  console.debug('record', record);
  const { dynamodb, eventName } = record;

  if (eventName === 'INSERT') {
    const { NewImage } = dynamodb || {};
    console.debug('NewImage', NewImage);
    await handleJob(unmarshall(NewImage) as Job);
  }
};

export const handleJob = async (job: Job) => {
  const { type, payload } = job;
  console.debug('handle-job', job);
  if (type === 'send-order-email') {
    const { orderId } = payload;
    await sendOrderEmailJob(orderId);
  }
};

export const sendOrderEmailJob = async (orderId: string) => {
  console.debug('send-order-email', { orderId });
  const order = await getOrderById(orderId);
  console.debug('send-order-email', { order });

  // send email
  const updateOrderResult = await _updateOrder({ id: order.id, emailStatus: 'sent' });
  console.debug('order-updated', updateOrderResult);
};

// TODO: send email services
export const sendEmail = () => {
  return true;
};
