import { CommonModule } from '@angular/common';
// Material Form Controls
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
// Material Data tables
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
  exports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
  ],
})
export class MaterialModule {
  private iconsUrl: string = 'assets/icons/';
  private imagesUrl: string = 'assets/dice/';

  private icons: IconData[] = [
    {
      name: 'github_light',
      path: `${this.iconsUrl}github_light.svg`,
    },
    {
      name: 'github_dark',
      path: `${this.iconsUrl}github_dark.svg`,
    },
  ];
  private images: string[] = [
    `${this.imagesUrl}dice_1.svg`,
    `${this.imagesUrl}dice_2.svg`,
    `${this.imagesUrl}dice_3.svg`,
    `${this.imagesUrl}dice_4.svg`,
    `${this.imagesUrl}dice_5.svg`,
    `${this.imagesUrl}dice_6.svg`,
    `${this.imagesUrl}jdice_1.svg`,
    `${this.imagesUrl}jdice_2.svg`,
    `${this.imagesUrl}jdice_3.svg`,
    `${this.imagesUrl}jdice_4.svg`,
    `${this.imagesUrl}jdice_5.svg`,
    `${this.imagesUrl}jdice_6.svg`,
    `${this.imagesUrl}dice_1_selected.svg`,
    `${this.imagesUrl}dice_2_selected.svg`,
    `${this.imagesUrl}dice_3_selected.svg`,
    `${this.imagesUrl}dice_4_selected.svg`,
    `${this.imagesUrl}dice_5_selected.svg`,
    `${this.imagesUrl}dice_6_selected.svg`,
    `${this.imagesUrl}jdice_1_selected.svg`,
    `${this.imagesUrl}jdice_2_selected.svg`,
    `${this.imagesUrl}jdice_3_selected.svg`,
    `${this.imagesUrl}jdice_4_selected.svg`,
    `${this.imagesUrl}jdice_5_selected.svg`,
    `${this.imagesUrl}jdice_6_selected.svg`,
  ];

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.icons.forEach((iconData) => {
      this.iconRegistry.addSvgIcon(
        iconData.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(iconData.path)
      );
    });
    this.images.forEach((image) => (new Image().src = image));
  }
}

interface IconData {
  name: string;
  path: string;
}
