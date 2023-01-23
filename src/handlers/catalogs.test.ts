import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from './catalogs';
// import { getCatalogById, getCatalogs } from '../services/catalog-services';

jest.mock('../services/catalog-services', () => ({
  getCatalogById: (id: string) => ({ message: 'get-catalog-by-id', id }),
  getCatalogs: () => 'get-catalogs',
}));
// const getCatalogByIdMock = getCatalogById as jest.Mock;
// const getCatalogsMock = getCatalogs as jest.Mock;

describe('Catalog', () => {
  it('handler - get catalogs', async () => {
    const event = {
      httpMethod: 'GET',
    } as APIGatewayProxyEvent;

    const result = await handler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify('get-catalogs'),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };

    expect(result).toEqual(expectedResult);
  });

  it('handler - get catalog by id', async () => {
    const event = {
      httpMethod: 'GET',
      pathParameters: { id: '1' },
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);
    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify({ message: 'get-catalog-by-id', id: 1 }),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    };

    expect(result).toEqual(expectedResult);
  });

  it('handler - exception', async () => {
    const event = {
      httpMethod: 'POST',
    } as unknown as APIGatewayProxyEvent;

    const result = await handler(event);
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