import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getCatalogById, getCatalogs, createCatalog } from '../services/catalog-services';
import { response, successResponse } from '../services/utils/http';

export const handlers = async ({
  httpMethod,
  pathParameters,
  body: bodyString,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let data: any;
    switch (httpMethod) {
      case 'POST':
        const body = bodyString ? JSON.parse(bodyString) : undefined;
        data = await createCatalog(body);
        break;
      case 'GET':
        const id = pathParameters?.id;
        if (id) {
          data = await getCatalogById(id);
          if (!data) {
            return response(404, { message: `Catalog with id ${id} not found!` });
          }
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
