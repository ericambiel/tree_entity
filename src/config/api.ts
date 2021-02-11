export default (): {
  /** @default 'false' */
  SILENT: boolean;
  // /** @default 'production' */
  // ENVIRONMENT: 'production' | 'development' | 'teste';
} => {
  process.env.NODE_DEBUG = process.env.API_DEBUG_LEVEL?.toUpperCase();
  return {
    SILENT: process.env.API_SILENT_MODE === 'enable',
    // ENVIRONMENT:
    //   (process.env.API_ENVIRONMENT as 'production' | 'development' | 'teste') ??
    //   'production',
  };
};
