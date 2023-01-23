import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getCatalogById, getCatalogs } from '../services/catalog-services';
import { response, successResponse } from '../services/utils/http';

export const handler = async ({ httpMethod, pathParameters }: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let data: any;
    switch (httpMethod) {
      case 'GET':
        const id = pathParameters?.id;
        if (id) {
          data = await getCatalogById(parseInt(id));
        } else {
          data = await getCatalogs();
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
    return response(500, errorResponse);
  }
};
