import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { GetAllCapitalsDataRes, MapActionTypes } from './map.actions';


@Injectable()
export class MapEffects {

  constructor(private actions$: Actions, private store: Store<any>, private http: HttpClient) {
  }

  @Effect()
  loadCapitals = this.actions$.pipe(
    ofType(MapActionTypes.GET_All_CAPITALS_DATA_REQ),
    switchMap(() => {
      return this.http.get('/assets/data/usa-capitals.geojson').pipe(
        map((response: any) => new GetAllCapitalsDataRes({capitals: response}))
      );
    }),
  );

}

