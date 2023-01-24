import { APIGatewayProxyEvent } from 'aws-lambda';
import { handlers } from './orders';

jest.mock('../services/order-services', () => ({
  createOrder: (body: any) => body,
  getOrderById: (id: number) => ({ id }),
}));

describe('Catalog', () => {
  it('handler - create order', async () => {
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ categoryId: 1 }),
    } as APIGatewayProxyEvent;

    const result = await handlers(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify({ categoryId: 1 }),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };

    expect(result).toEqual(expectedResult);
  });

  it('get order', async () => {
    const event = {
      httpMethod: 'GET',
      pathParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;

    const result = await handlers(event);
    console.debug('result', result);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify({ id: '1' }),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };
    expect(result).toEqual(expectedResult);
  });

  it('handler - exception', async () => {
    const event = {
      httpMethod: 'GET',
    } as unknown as APIGatewayProxyEvent;

    const result = await handlers(event);
    const expectedResult = {
      statusCode: 404,
      body: JSON.stringify({ message: 'Not Found' }),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };
    expect(result).toEqual(expectedResult);
  });
});
