import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createOrder, getOrderById } from '../services/order-services';
import { response, successResponse } from '../services/utils/http';

export const handlers = async ({
  httpMethod,
  body: bodyString,
  pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let data: any;
    switch (httpMethod) {
      case 'POST':
        const body = bodyString ? JSON.parse(bodyString) : undefined;
        data = await createOrder(body);
        break;
      case 'GET':
        const id = pathParameters?.id;
        if (id) {
          data = await getOrderById(parseInt(id));
        }
        break;
      default:
        return response(404, { message: 'Not Found' });
    }

    return successResponse(data);
  } catch (error) {
    const errorResponse = {
      message: 'Internal service error',
    };
    console.error('error', error);
    return response(500, errorResponse);
  }
};
