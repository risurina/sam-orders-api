import { DynamoDBClient, DynamoDBClientConfig, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocument,
  GetCommand,
  PutCommand,
  UpdateCommand,
  UpdateCommandInput,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateCommandOutput,
  GetCommandOutput,
  PutCommandOutput,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { AWS, LOCAL_DYNAMODB_ENDPOINT as endpoint } from '../../common/config';

// see https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
// see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01
// see https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html
// see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html

const ddbClientConfig: DynamoDBClientConfig = { region: AWS.REGION };
if (endpoint) {
  ddbClientConfig.endpoint = endpoint;
}
const ddbClient = new DynamoDBClient(ddbClientConfig);

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: true, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: true, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB Document client.
const ddbDocClient = DynamoDBDocument.from(ddbClient, translateConfig);

export function getDynamoDBClient(): DynamoDBClient {
  return ddbClient;
}

export function getDynamoDocClient() {
  return ddbDocClient;
}

export async function create(
  TableName: string,
  Key: { [key: string]: string | number },
  content?: any, // eslint-disable-line
): Promise<PutCommandOutput> {
  const params = {
    TableName,
    Item: {
      ...Key,
      ...content,
    },
  };

  const data = await ddbDocClient.send(new PutCommand(params));
  // console.debug('Success - item added or updated', data);
  return data;
}

export async function get(TableName: string, Key: { [key: string]: string | number }): Promise<GetCommandOutput> {
  const params = {
    TableName,
    Key,
  };

  const data = await ddbDocClient.send(new GetCommand(params));
  // console.debug('Success :', data);
  // console.debug('Success :', data.Item);
  return data;
}

/**
 * @param input has the below
 * // Define expressions for the new or updated attributes
    UpdateExpression: 'set ATTRIBUTE_NAME_1 = :t, ATTRIBUTE_NAME_2 = :s', // For example, "'set Title = :t, Subtitle = :s'"
    ExpressionAttributeValues: {
      ':t': 'NEW_ATTRIBUTE_VALUE_1', // For example ':t' : 'NEW_TITLE'
      ':s': 'NEW_ATTRIBUTE_VALUE_2', // For example ':s' : 'NEW_SUBTITLE'
    },
    ReturnValues: 'ALL_NEW',
 */
export async function update(input: UpdateCommandInput): Promise<UpdateCommandOutput> {
  const { TableName, Key, UpdateExpression, ExpressionAttributeValues, ReturnValues = 'ALL_NEW' } = input || {};
  const params = {
    TableName,
    Key,
    // Define expressions for the new or updated attributes
    UpdateExpression,
    ExpressionAttributeValues,
    ReturnValues,
  };

  const data = await ddbDocClient.send(new UpdateCommand(params));
  // console.debug('Success - item added or updated', data);
  return data;
}

/**
 * @param input has the below
    ExpressionAttributeValues: {
      ':s': 1,
      ':e': 1,
      ':topic': 'Title2',
    },
    // Filter that returns only episodes that meet previous criteria and have the subtitle 'The Return'
    FilterExpression: 'contains (Subtitle, :topic)',
 */
export async function scan(input: ScanCommandInput): Promise<ScanCommandOutput> {
  const {
    TableName,
    FilterExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ProjectionExpression,
    Select,
  } = input || {};
  const params = {
    TableName,
    FilterExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ProjectionExpression,
    Select,
  };
  const data = await ddbDocClient.send(new ScanCommand(params));
  // console.debug('Success. Item details: ', data);
  // console.debug('Success. Item details: ', data.Items);
  return data;
}

export async function _delete(TableName: string, Key: { [key: string]: string }) {
  const params = {
    TableName,
    Key,
  };
  const data = await ddbDocClient.send(new DeleteCommand(params));
  return data;
}
