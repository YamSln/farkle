import env from "./env";

const SERVER_HOST = process.env.HOST || "localhost";
const SERVER_PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = env.allowedOrigin();
export const allowedHeaders = [
  "Origin",
  "X-Requested-With",
  "Content-Type",
  "Accept",
  "Authorization",
];
export const methods = ["GET", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"];
const corsOptions = {
  allowedHeaders,
  methods,
  origin: ALLOWED_ORIGIN,
};

const SERVER = {
  hostName: SERVER_HOST,
  port: SERVER_PORT,
  allowedOrigin: ALLOWED_ORIGIN,
  corsOptions,
  ioOptions: {
    pingInterval: 2000,
    pingTimeout: 5000,
    cors: corsOptions,
  },
};

export const serverConfig = {
  server: SERVER,
};
