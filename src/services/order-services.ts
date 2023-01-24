import { Order } from '../types/orders';
import { createItem, getItem } from './dynamo/orders';
import { v4 as uuidv4 } from 'uuid';

export async function createOrder(order: Order): Promise<Order> {
  const id = uuidv4();
  const createdOrder = await createItem({ ...order, id });
  return createdOrder;
}

export async function getOrderById(id: string): Promise<Order> {
  const order = await getItem({ id });
  return order;
}
