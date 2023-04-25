import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mute-toggle',
  templateUrl: './mute-toggle.component.html',
  styleUrls: ['./mute-toggle.component.scss'],
})
export class MuteToggleComponent implements OnInit {
  @Input() muted!: boolean;

  @Output() muteToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onMuteToggle(): void {
    this.muteToggle.emit();
  }
}
