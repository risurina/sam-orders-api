import { response, successResponse } from './http';

describe('http services', () => {
  it('response', () => {
    const responseData = { message: 'Not found!' };
    const result = response(404, responseData);
    expect(result).toEqual({
      statusCode: 404,
      body: JSON.stringify(responseData),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    });
  });

  it('successResponse', () => {
    const responseData = { catalog: { id: 1 } };
    const result = successResponse(responseData);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(responseData),
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    });
  });
});
