import { NextFunction, Request, Response } from "express";
import { JoinPayload } from "../model/join.payload";
import handler from "../service/game.handler";
import { HttpStatusCode } from "../util/http-status-code";
import { MIN_PLAYERS } from "../util/game.constants";

const createGame = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<any> => {
  // Get create payload
  const { nick, password, maxPlayers, maxPoints } = request.body;
  // Generate token
  const token = handler.createGame(nick, password, maxPlayers, maxPoints);
  // Return response
  return response
    .status(HttpStatusCode.CREATED)
    .json({ token, maxPlayers: maxPlayers || MIN_PLAYERS });
};

const joinGame = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<any> => {
  // Get join payload
  const joinPayload: JoinPayload = request.body;
  // Generate token
  const token = handler.joinGame(joinPayload);
  // Return response
  return response.status(HttpStatusCode.OK).json(token);
};

export default {
  createGame,
  joinGame,
};
