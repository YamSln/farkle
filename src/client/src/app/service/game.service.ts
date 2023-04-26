import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateGamePayload } from '../../../../payload/create-game.payload';
import { CreateGameResponse } from '../model/create-game.response';
import { JoinPayload } from '../../../../payload/join.payload';

export const API_URL = environment.api;
export const CREATE_URL = `${API_URL}/create`;
export const JOIN_URL = `${API_URL}/join`;

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  createGame(payload: CreateGamePayload): Observable<CreateGameResponse> {
    return this.http.post<CreateGameResponse>(CREATE_URL, payload);
  }

  join(payload: JoinPayload): Observable<string> {
    return this.http.post<string>(JOIN_URL, payload);
  }
}
