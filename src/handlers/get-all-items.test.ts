import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './get-all-items';

describe('test handler', () => {
  it('test', async () => {
    const event = {
      httpMethod: 'GET',
      body: JSON.stringify({
        id: '1',
      }),
    } as APIGatewayProxyEvent;

    const result = await handler(event);
    const expectedResult = {
      statusCode: 200,
      body: '{"httpMethod":"GET","body":"{\\"id\\":\\"1\\"}"}',
    };

    expect(result).toEqual(expectedResult);
  });
});
