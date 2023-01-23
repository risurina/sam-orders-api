import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createOrder } from '../services/order-services';
import { response, successResponse } from '../services/utils/http';

export const handlers = async ({
  httpMethod,
  body: bodyString,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let data: any;
    switch (httpMethod) {
      case 'POST':
        const body = bodyString ? JSON.parse(bodyString) : undefined;
        data = await createOrder(body);
        break;
      default:
        return response(404, { message: 'Not Found' });
    }

    return successResponse(data);
  } catch (error) {
    const errorResponse = {
      message: 'Internal service error',
    };
    return response(500, errorResponse);
  }
};
