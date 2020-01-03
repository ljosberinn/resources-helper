import faunadb from 'faunadb';

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_DB_SECRET,
});

export async function handler({ queryStringParameters: { id } }, context) {
  if (!id) {
    return {
      statusCode: 400,
    };
  }

  return {
    statusCode: 200,
    body: id,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
