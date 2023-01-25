import { Order } from '../types/orders';
import { createItem as _createOrder, getItem } from './dynamo/orders';
import { createItem as _createJob } from './dynamo/jobs';
import { v4 as uuidv4 } from 'uuid';
import { getCatalogById } from './catalog-services';

export async function createOrder(order: Order): Promise<Order | any> {
  const catalog = await getCatalogById(order?.item?.catalogId);
  if (!catalog) {
    return {
      message: 'Product not found!',
    };
  }

  const orderItem = {
    id: uuidv4(),
    catalogId: order?.item?.catalogId || '',
    quantity: order?.item?.quantity,
    amount: order?.item?.quantity * catalog.amount,
  };

  const item = { ...order, id: uuidv4(), emailStatus: 'pending', item: orderItem };
  const createdOrder = await _createOrder(item);

  // create job
  const job = await _createJob({
    id: uuidv4(),
    type: 'send-order-email',
    payload: {
      orderId: createdOrder.id,
    },
  });
  console.debug('job created', job);

  return createdOrder;
}

export async function getOrderById(id: string): Promise<Order> {
  const order = await getItem({ id });
  return order;
}
