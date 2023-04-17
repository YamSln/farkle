import { NextFunction, Request, Response } from "express";
import env from "../config/env";
import { allowedHeaders, methods } from "../config/server-config";
import { HttpStatusCode } from "../util/http-status-code";

const options = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  response.header("Access-Control-Allow-Origin", env.allowedOrigin());
  response.header("Access-Control-Allow-Methods", methods.toString());
  response.header("Access-Control-Allow-Headers", allowedHeaders.toString());
  response.status(HttpStatusCode.OK);
  next();
};

export default options;
