import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../utils/statusCodes';
import mysql from 'promise-mysql';
import PRICE_AGE_RANGES from '../constants/priceRanges';

export async function handler({ queryStringParameters: { range } }) {
  if (!range || !PRICE_AGE_RANGES.includes(parseInt(range))) {
    return {
      statusCode: BAD_REQUEST,
    };
  }

  const connection = await mysql.createConnection({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PW,
    database: process.env.REACT_APP_DB_NAME,
    returnArgumentsArray: true,
  });

  try {
    const [data] = await connection.query(
      `SELECT id, avgBase, avgBid FROM market_${range}_hour`,
    );

    await connection.end();

    return {
      statusCode: OK,
      body: JSON.stringify(
        data.map(({ id, avgBase, avgBid }) => ({
          id,
          price: avgBase > avgBid ? avgBase : avgBid,
        })),
      ),
    };
  } catch (error) {
    console.error(error);

    await connection.end();

    return {
      statusCode: INTERNAL_SERVER_ERROR,
    };
  }
}
