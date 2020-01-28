import { allowedSpecialCharacters, characterPattern } from './validators';

/**
 *
 * @param {string} string
 */
export const stringContainsNumber = string =>
  string.split('').filter(Number).length > 0;

/**
 *
 * @param {string} string
 */
export const stringContainsSpecialCharacter = string =>
  new RegExp(`[${allowedSpecialCharacters.join('')}]`).test(string);

/**
 *
 * @param {string} string
 */
export const stringContainsLetter = string =>
  new RegExp(characterPattern).test(string);

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const upperCaseFirstCharacter = str =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 *
 * @param {RequestInfo} url
 * @param {RequestInit} options
 */
export const abortableFetchJSON = async (url, options) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...options.headers, Accept: 'application/json' },
    });

    if (response.ok) {
      const json = await response.json();

      return json;
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      throw Error(error);
    }
  }
};
