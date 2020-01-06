const BASE_PATH = '/.netlify/functions';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
};

export default class UserService {
  /**
   *
   * @param {AbortSignal} signal
   */
  constructor(signal) {
    this.signal = signal;
  }

  /**
   *
   * @param {'get' | 'create'} action
   * @param {{
   * [key: string]: string | number
   * }} params
   */
  _createUrl(action, params) {
    switch (action) {
      case 'get':
        if (!params.id) {
          throw new Error(`missing param id`);
        }

        const searchParams = new URLSearchParams(params).toString();

        return {
          url: `${BASE_PATH}/getUser?${searchParams}`,
          options: {
            headers: DEFAULT_HEADERS,
            signal: this.signal,
          },
        };

      case 'create':
        return {
          url: `${BASE_PATH}/createUser`,
          options: {
            method: 'POST',
            body: JSON.stringify(params),
            signal: this.signal,
            headers: {
              ...DEFAULT_HEADERS,
              'Content-type': 'application/json',
            },
          },
        };
      default:
        throw new Error(`unknown UserService._createUrl action: ${action}`);
    }
  }

  /**
   *
   * @param {string} id
   */
  async get(id) {
    const { url, options } = this._createUrl('get', { id });

    const response = await fetch(url, options);
    const json = await response.json();

    return json;
  }

  /**
   *
   * @param {string} id
   */
  async create(id) {
    const { url, options } = this._createUrl('create', { id });

    const response = await fetch(url, options);

    if (response.ok) {
      const json = await response.json();

      return json;
    }

    throw new Error(`Failed to create user with id: ${id}`);
  }
}
