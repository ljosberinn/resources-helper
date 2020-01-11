const createKey = key => `REACT_APP_${key}`;

const variableExistsInEnv = key =>
  process.env[key] && process.env[key].length > 0;

const throwErrorForMissingEnv = key => {
  throw new Error(`missing env variable: ${key}`);
};

const requiredEnvVariables = [
  'REPO_LINK',
  'BRAND_NAME',
  'SITE_URL',
  'ENABLED_LANGUAGES',
  'ENABLED_PROVIDER',
];

const requiredButHiddenVariables = ['CRON_TOKEN'];

const optionalEnvVariables = [
  'SENTRY_DSN',
  'FAUNA_DB_SECRET',
  'LOGROCKET_ID',
  'DISCORD_LINK',
];

requiredButHiddenVariables.forEach(envName => {
  const key = createKey(envName);

  if (!variableExistsInEnv(key)) {
    throwErrorForMissingEnv(key);
  }
});

export default [...requiredEnvVariables, ...optionalEnvVariables].reduce(
  (carry, envName) => {
    const key = createKey(envName);

    if (variableExistsInEnv(key)) {
      carry[envName] = process.env[key];
    } else if (requiredEnvVariables.includes(envName)) {
      throwErrorForMissingEnv(key);
    }

    return carry;
  },
  {},
);
