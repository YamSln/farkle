import { check } from "express-validator";
import {
  MAX_PLAYERS,
  MAX_POINTS,
  MIN_PLAYERS,
  MIN_POINTS,
} from "../util/game.constants";
import {
  MAX_PLAYERS_MAX,
  MAX_PLAYERS_MIN,
  MAX_PLAYERS_REQUIRED,
  MAX_POINTS_REQUIRED,
  NICK_MAX_LENGTH,
  NICK_MIN_LENGTH,
  NICK_REQUIRED,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
  MAX_POINTS_MIN,
  MAX_POINTS_MAX,
} from "./validation.messages";

const MIN_NICK_LENGTH = 2;
const MAX_NICK_LENGTH = 15;
const MIN_PASSWORD_LENGTH = 3;
const MAX_PASSWORD_LENGTH = 10;
const MAXIMUM_POINTS_MAX = MAX_POINTS;
const MAXIMUM_POINTS_MIN = MIN_POINTS;
const MINIMUM_MAX_PLAYERS = MIN_PLAYERS;
export const MAXIMUM_MAX_PLAYERS = MAX_PLAYERS;

const validateNick = check("nick")
  .exists()
  .withMessage(NICK_REQUIRED)
  .isLength({ min: MIN_NICK_LENGTH })
  .withMessage(NICK_MIN_LENGTH)
  .isLength({ max: MAX_NICK_LENGTH })
  .withMessage(NICK_MAX_LENGTH);

const validatePassword = check("password")
  .exists()
  .withMessage(PASSWORD_REQUIRED)
  .isLength({ min: MIN_PASSWORD_LENGTH })
  .withMessage(PASSWORD_MIN_LENGTH)
  .isLength({ max: MAX_PASSWORD_LENGTH })
  .withMessage(PASSWORD_MAX_LENGTH);

const validateMaxPlayers = check("maxPlayers")
  .exists()
  .withMessage(MAX_PLAYERS_REQUIRED)
  .isInt({ min: MINIMUM_MAX_PLAYERS })
  .withMessage(MAX_PLAYERS_MIN)
  .isInt({ max: MAXIMUM_MAX_PLAYERS })
  .withMessage(MAX_PLAYERS_MAX);

const validateMaxPoints = check("maxPoints")
  .exists()
  .withMessage(MAX_POINTS_REQUIRED)
  .isInt({ min: MAXIMUM_POINTS_MIN })
  .withMessage(MAX_POINTS_MIN)
  .isInt({ max: MAXIMUM_POINTS_MAX })
  .withMessage(MAX_POINTS_MAX);

export const validateCreatePayload = [
  validateNick,
  validatePassword,
  validateMaxPlayers,
  validateMaxPoints,
];

export const validateJoinPayload = [validateNick, validatePassword];
