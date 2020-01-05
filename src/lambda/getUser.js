import faunadb from 'faunadb';
import user from '../models/user';
import { BAD_REQUEST, OK } from '../utils/statusCodes';

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_DB_SECRET,
});

export async function handler({ queryStringParameters: { id } }, context) {
  if (!id) {
    return {
      statusCode: BAD_REQUEST,
    };
  }

  // todo: actually load user

  return {
    statusCode: OK,
    body: JSON.stringify({ ...user, id }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
