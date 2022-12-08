import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog/service/dialog.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  @Input() isLightTheme: boolean = false;
  @Input() menu: boolean = false;

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  onRulesClick(): void {
    this.dialogService.openRulesDialog();
  }
}
