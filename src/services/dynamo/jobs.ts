import { AWSENV } from '../../common/config';
import { Job } from '../../types/jobs';
import { create, get, _delete } from '../aws/dynamo-service';

const TABLE_NAME = `jobs-${AWSENV}`;

type Item = Job;

type Keys = Pick<Job, 'id'>;

export async function createItem(item: Item): Promise<Item> {
  await create(TABLE_NAME, { id: item.id }, item);
  return getItem(item);
}

export async function getItem(keys: Keys): Promise<Item> {
  const response = await get(TABLE_NAME, { id: keys.id });
  return response.Item as Item;
}

export async function deleteItem(keys: Keys): Promise<void> {
  await _delete(TABLE_NAME, keys);
}
