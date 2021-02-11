export default (): {
  DIALECT: string;
  HOST: string;
  PORT: string;
  BASE: string;
  USER: string;
  PASSWORD: string;
} => {
  return {
    DIALECT: process.env.DB_DIALECT ?? '',
    HOST: process.env.DB_HOST ?? '',
    PORT: process.env.DB_PORT ?? '',
    BASE: process.env.DB_NAME ?? '',
    USER: process.env.DB_USER ?? '',
    PASSWORD: process.env.DB_PASSWORD ?? '',
  };
};
