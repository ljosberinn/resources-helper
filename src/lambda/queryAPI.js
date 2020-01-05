import { OK, BAD_REQUEST, SERVICE_UNAVAILABLE } from '../utils/statusCodes';
import APIService from '../services/api';
import { validate } from '../utils/validators';

export async function handler(
  { queryStringParameters: { key, userId, id } },
  context,
) {
  if (!key || !userId || !id || !validate.apiKey(key)) {
    return {
      statusCode: BAD_REQUEST,
    };
  }

  try {
    const service = new APIService(id, key);
    const response = await service.makeRequest();

    return {
      statusCode: OK,
      body: JSON.stringify({ context, response }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: SERVICE_UNAVAILABLE,
    };
  }
}
