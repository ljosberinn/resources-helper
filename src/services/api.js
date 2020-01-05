import fetch from 'node-fetch';
import AbortController from 'abort-controller';

const ENDPOINT = 'https://resources-game.ch/resapi/';

const DEFAULT_PARAMS = {
  f: 1, // json,
  l: 'en', // language
  d: 30, // history
};

/**
 * @description To be used with the queryAPI lambda only
 */
export default class APIService {
  /**
   *
   * @param {0 | 1 | 2 | 3 | 4 | 5 | 51 | 6 | 7 | 8 | 9 | 10 | 11} id
   * @param {string} key
   */
  constructor(id, key) {
    this.id = id;
    this.key = key;
  }

  _prepareRequest() {
    const params = new URLSearchParams({
      ...DEFAULT_PARAMS,
      q: this.id,
      k: this.key,
    });

    return {
      url: [ENDPOINT, params].join('?'),
      options: {
        headers: {
          Accept: 'application/json',
        },
      },
    };
  }

  async makeRequest() {
    const { url, options } = this._prepareRequest();

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 10 * 1000);

    const response = await fetch(url, { ...options, timeout: controller });

    clearTimeout(timeout);

    if (response.ok) {
      const json = await response.json();
      return json;
    }

    return null;
  }
}
