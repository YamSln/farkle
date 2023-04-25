import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@angular/flex-layout';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedReducer } from './shared/state/shared.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LocalStorageService } from './shared/service/localstorage.service';
import { getMetaReducers } from './shared/state/shared.meta-reducer';
import { SHARED_STATE_NAME } from './shared/state/shared.selector';
import { SoundService } from './shared/service/sound.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({ [SHARED_STATE_NAME]: SharedReducer }),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production,
        })
      : [],
  ],
  providers: [
    {
      provide: META_REDUCERS,
      deps: [LocalStorageService, SoundService],
      useFactory: getMetaReducers,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
