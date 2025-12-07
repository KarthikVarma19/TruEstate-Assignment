function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const APP_CONFIG = {
  PORT: getEnvVar("PORT"),
  API_URL: getEnvVar("API_URL"),

  MONGO_URI: getEnvVar("MONGO_URI"),

  REDIS_USERNAME: getEnvVar("REDIS_USERNAME"),
  REDIS_PASSWORD: getEnvVar("REDIS_PASSWORD"),
  REDIS_HOST: getEnvVar("REDIS_HOST"),
  REDIS_PORT: getEnvVar("REDIS_PORT")
};