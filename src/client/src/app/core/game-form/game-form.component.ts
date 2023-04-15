import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GameFacade } from 'src/app/game/state/game.facade';
import { CreateGamePayload } from '../../../../../model/create-game.payload';
import { JoinPayload } from '../../../../../model/join.payload';
import { MIN_PLAYERS, MIN_POINTS } from '../../../../../util/game.constants';
import {
  MIN_NICK_LENGTH,
  MAX_NICK_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../../../../validation/validation.constants';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit {
  gameForm!: FormGroup;
  create!: boolean;
  formHeading!: string;
  formButtonText!: string;
  maxPlayersSlider: number = MIN_PLAYERS;
  maxPointsSlider: number = MIN_POINTS;

  constructor(
    private formBuilder: FormBuilder,
    private gameFacade: GameFacade,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.create = !this.activatedRoute.snapshot.url.toString().includes('join');
    this.formHeading = this.create ? 'Create Game' : '';
    this.formButtonText = this.create ? 'Create' : 'Join';
    this.gameForm = this.formBuilder.group({
      nick: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_NICK_LENGTH),
          Validators.maxLength(MAX_NICK_LENGTH),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.maxLength(MAX_PASSWORD_LENGTH),
        ],
      ],
    });
  }

  submit(): void {
    if (!this.gameForm.valid) {
      return;
    }
    if (this.create) {
      const game: CreateGamePayload = {
        nick: this.gameForm.controls['nick'].value,
        password: this.gameForm.controls['password'].value,
        maxPlayers: this.maxPlayersSlider,
        maxPoints: this.maxPointsSlider,
        room: '',
      };
      this.gameFacade.createGame(game);
    } else {
      const game: JoinPayload = {
        nick: this.gameForm.controls['nick'].value,
        password: this.gameForm.controls['password'].value,
        room: this.activatedRoute.snapshot.params['roomId'],
      };
      this.gameFacade.joinGame(game);
    }
  }
}
