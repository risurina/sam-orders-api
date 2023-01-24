import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AWSENV } from '../../common/config';
import { Order } from '../../types/orders';
import { create, get, scan } from '../aws/dynamo-service';

const TABLE_NAME = `orders-${AWSENV}`;

type Item = Order;

type Keys = Pick<Order, 'id'>;

export async function createItem(item: Item): Promise<Item> {
  await create(TABLE_NAME, { id: item.id }, item);
  return getItem(item);
}

export async function getItem(keys: Keys): Promise<Item> {
  const response = await get(TABLE_NAME, { id: keys.id });
  return response.Item as Item;
}

export async function getItemsCount(): Promise<number> {
  const response = await scan({
    TableName: TABLE_NAME,
    Select: 'COUNT',
  });
  const count = response.ScannedCount || 0;
  return count;
}

/**
 * assuming all input value is a string
 * condition is equal only
 *
 * @param inputs { name: 'ronnie', age: '29' }
 * @returns
  {
    "FilterExpression": "#name = :name = #age = :age",
    "ExpressionAttributeNames": { "#name": "name", "#age": "age" },
    "ExpressionAttributeValues": { ":name": { "S": "ronnie" }, ":age": { "S": "24" } }
  }
 */
export function getFilterExpression(inputs: { [key: string]: string }) { // eslint-disable-line
  const filterExpression = [];
  const ExpressionAttributeNames: { [key: string]: string } = {};
  const ExpressionAttributeValues: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(inputs)) {
    filterExpression.push(`#${key} = :${key}`);
    ExpressionAttributeNames['#' + key] = key;
    ExpressionAttributeValues[':' + key] = { S: value };
  }

  return {
    FilterExpression: filterExpression.join(' AND '),
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
}

export async function getItemByColumn(filter: { [key: string]: string }): Promise<Item[]> {
  const response = await scan({
    TableName: TABLE_NAME,
    ...getFilterExpression(filter),
  });

  const items = response.Items || [];
  return items.map((item) => unmarshall(item)) as Item[];
}
