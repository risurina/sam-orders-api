import { Order } from '../types/orders';
import { createItem as _createOrder, getItem } from './dynamo/orders';
import { v4 as uuidv4 } from 'uuid';
import { getCatalogById } from './catalog-services';

export async function createOrder(order: Order): Promise<Order | any> {
  const catalog = await getCatalogById(order?.item?.categoryId);
  if (!catalog) {
    return {
      message: 'Product not found!',
    };
  }

  const orderItem = {
    id: uuidv4(),
    categoryId: order?.item?.categoryId || '',
    quantity: order?.item?.quantity,
    amount: order?.item?.quantity * catalog.amount,
  };

  const item = { ...order, id: uuidv4(), isEmailSend: false, item: orderItem };
  const createdOrder = await _createOrder(item);
  return createdOrder;
}

export async function getOrderById(id: string): Promise<Order> {
  const order = await getItem({ id });
  return order;
}
