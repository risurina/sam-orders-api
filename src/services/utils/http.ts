import { APIGatewayProxyResult } from 'aws-lambda';

type Body = {
  [key: string]: any;
};

export function response(statusCode: number, body: Body): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}

export function successResponse(body: Body): APIGatewayProxyResult {
  return response(200, body);
}
