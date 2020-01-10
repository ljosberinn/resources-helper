import fetch from 'node-fetch';
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  REQUEST_TIMEOUT,
} from '../utils/statusCodes';
import faunadb from 'faunadb';

const URL = 'https://www.resources-game.ch/exchange/kurseliste_json.txt';

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_DB_SECRET,
});

export async function handler() {
  const response = await fetch(URL);

  if (!response.ok) {
    return {
      statusCode: REQUEST_TIMEOUT,
    };
  }

  const json = await response.json();

  const data = {
    ts: parseInt(json[0].TS),
    data: json.map(({ ITEM_ID, SMKURS, NORMKURS }) => ({
      id: parseInt(ITEM_ID),
      base: parseInt(NORMKURS),
      bid: parseInt(SMKURS),
    })),
  };

  try {
    // see https://docs.fauna.com/fauna/current/api/fql/functions/create#param_object
    await client.query(
      q.Create(q.Collection('market'), {
        data,
        ttl: q.Time(createExpiration(data.ts * 1000)),
      }),
    );

    return {
      statusCode: CREATED,
      headers: {
        'Content-type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      body: error.message,
    };
  }
}

function createExpiration(now) {
  const date = new Date(now);
  date.setFullYear(date.getFullYear() + 1);

  return date.toISOString();
}
