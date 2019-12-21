import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapModule } from './map/map.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GetAllCapitalsDataReq } from './map/store/map.actions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MapModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (store: Store<any>) => {
    //     return () => {
    //       store.dispatch(new GetAllCapitalsDataReq());
    //     };
    //   },
    //   multi: true,
    //   deps: [Store]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
