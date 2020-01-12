import fetch from 'node-fetch';
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  REQUEST_TIMEOUT,
  UNAUTHORIZED,
} from '../utils/statusCodes';
import mysql from 'promise-mysql';

const URL = 'https://www.resources-game.ch/exchange/kurseliste_json.txt';

const CRON_TOKEN = process.env.REACT_APP_CRON_TOKEN;

export async function handler({ headers, httpMethod }) {
  if (
    httpMethod !== 'HEAD' ||
    !headers['x-cron-token'] ||
    headers['x-cron-token'] !== CRON_TOKEN
  ) {
    return {
      statusCode: UNAUTHORIZED,
    };
  }

  const response = await fetch(URL, {
    headers: {
      'x-app': 'resources-helper-4',
    },
  });

  if (!response.ok) {
    return {
      statusCode: REQUEST_TIMEOUT,
    };
  }

  const json = await response.json();

  try {
    const connection = await mysql.createConnection({
      host: process.env.REACT_APP_DB_HOST,
      user: process.env.REACT_APP_DB_USER,
      password: process.env.REACT_APP_DB_PW,
      database: process.env.REACT_APP_DB_NAME,
      connectTimeout: 25 * 1000, // might prevent PROTOCOL_SEQUENCE_TIMEOUT
    });

    const queryString = createInsertQuery(json);

    await connection.query(queryString);

    connection.end();

    return {
      statusCode: CREATED,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 *
 * @param {{
 *  ITEM_ID: string,
 *  NORMKURS: string,
 *  SMKURS: string
 *  TS: string
 * }[]
 * } data
 */
const createInsertQuery = data => {
  const timestamp = parseInt(data[0].TS);

  const values = data
    .map(
      ({ ITEM_ID, SMKURS, NORMKURS }) =>
        `(${[
          timestamp,
          parseInt(ITEM_ID),
          parseInt(NORMKURS),
          parseInt(SMKURS),
        ].join(',')})`,
    )
    .join(', ');

  return `INSERT INTO market (timestamp, itemId, base, bid) VALUES${values}`;
};
