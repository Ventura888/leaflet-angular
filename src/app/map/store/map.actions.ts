import { Action } from '@ngrx/store';

export enum MapActionTypes {
  GET_All_CAPITALS_DATA_REQ = 'GET_All_CAPITALS_DATA_REQ',
  GET_All_CAPITALS_DATA_RES = 'GET_All_CAPITALS_DATA_RES',
  SET_SELECTED_CITY = 'SET_SELECTED_CITY',
  SELECT_MAP_TYPE = 'SELECT_MAP_TYPE',
}

export type MapActions =
  GetAllCapitalsDataReq |
  GetAllCapitalsDataRes |
  SetSelectedCity |
  SelectMapType



export class GetAllCapitalsDataReq implements Action {
  readonly type = MapActionTypes.GET_All_CAPITALS_DATA_REQ;

  constructor() {}
}

export interface GetAllCapitalsDataResPayload {
  capitals: any;
}

export class GetAllCapitalsDataRes implements Action {
  readonly type = MapActionTypes.GET_All_CAPITALS_DATA_RES;

  constructor(public payload: GetAllCapitalsDataResPayload) {}
}


export interface SetSelectedCityPayload {
  selectedCity: any;
}

export class SetSelectedCity implements Action {
  readonly type = MapActionTypes.SET_SELECTED_CITY;

  constructor(public payload: SetSelectedCityPayload) {}
}


export interface SelectMapTypePayload {
  selectedMapType: any;
}

export class SelectMapType implements Action {
  readonly type = MapActionTypes.SELECT_MAP_TYPE;

  constructor(public payload: SelectMapTypePayload) {}
}


