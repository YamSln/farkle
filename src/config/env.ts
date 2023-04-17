const devEnv = (): boolean => {
  return process.env.NODE_ENV !== "production";
};

const allowedOrigin = (): string => {
  return process.env.ORIGIN || "*";
};

export default { devEnv, allowedOrigin };
