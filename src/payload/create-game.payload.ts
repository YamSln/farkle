export interface CreateGamePayload {
  roomId: string;
  nick: string;
  password: string;
  maxPlayers: number;
  maxPoints: number;
}
