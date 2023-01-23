import { Order } from '../types/orders';

export async function createOrder(order: Order): Promise<Order> {
  // Todo: save order to database
  return order;
}
