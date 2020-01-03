import faunadb from 'faunadb';

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_DB_SECRET,
});

export async function handler(body, context) {
  console.log({ body, context });

  return {
    statusCode: 200,
    body: 'ack',
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
