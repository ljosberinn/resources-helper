import user from '../models/user';
import { BAD_REQUEST, CREATED } from '../utils/statusCodes';

export async function handler({ httpMethod, body }, context) {
  if (httpMethod !== 'POST' || body.length === 0) {
    return {
      statusCode: BAD_REQUEST,
    };
  }

  try {
    const payload = JSON.parse(body);

    if (!payload.id) {
      return {
        statusCode: BAD_REQUEST,
      };
    }

    // todo: actually store user

    return {
      statusCode: CREATED,
      body: JSON.stringify({ ...user, id: payload.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: BAD_REQUEST,
    };
  }
}
