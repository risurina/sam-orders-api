import { Order } from '../types/orders';

export async function createOrder(order: Order): Promise<Order> {
  // Todo: save order to database
  return order;
}

export async function getOrderById(id: number): Promise<Order> {
  // Todo: get order from database
  return {
    id,
    totalAmount: 100,
    items: [],
    isEmailSend: true,
  };
}
