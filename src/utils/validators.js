const allowedSpecialCharacters = [
  '!',
  '"',
  '§',
  '$',
  '%',
  '&',
  '/',
  '(',
  ')',
  '=',
  '?',
  ',',
  '.',
  ';',
  ':',
  '_',
  '-',
];
const characterPattern = '[A-Za-z]';
const passwordPattern = `^(?=.*${characterPattern})(?=.*[0-9])(?=.{8,}).*$`;
const usernamePattern = '^[a-zA-Z0-9]+(?:[._ -]?[a-zA-Z0-9])*$';
const apiKeyPattern = '[\\da-z]{45}';

/**
 *
 * @param {string} key
 */
const isValidAPIKey = key => new RegExp(apiKeyPattern).test(key);
/**
 *
 * @param {string} key
 */
const isValidUsername = userName => new RegExp(usernamePattern).test(userName);

/**
 *
 * @param {string} key
 */
const isValidPassword = password => new RegExp(passwordPattern).test(password);

// https://stackoverflow.com/a/32686261
const isValidMail = mail => {
  if (mail.length === 0) {
    return false;
  }

  try {
    const input = Object.assign(document.createElement('input'), {
      type: 'email',
      value: mail,
    });

    return input.checkValidity();
  } catch (e) {
    // in case of input.checkValidity not being available in some older browsers
    // log the error, so Sentry catches it regardless
    console.error(e);
    // return true because we can't verify the mail at the frontend
    // so the backend has to step in
    return true;
  }
};

const validate = {
  mail: isValidMail,
  password: isValidPassword,
  username: isValidUsername,
  apiKey: isValidAPIKey,
};

const pattern = {
  mail: '',
  password: passwordPattern,
  userName: usernamePattern,
  apiKey: apiKeyPattern,
};

export { validate, pattern, allowedSpecialCharacters, characterPattern };
