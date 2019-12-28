import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapStateInterface } from './map.initState';


const appFeatureState = createFeatureSelector<MapStateInterface>('map');

export const allCapitalsSelector = createSelector(appFeatureState, (state: MapStateInterface) => state.capitals);
export const selectedCitySelector = createSelector(appFeatureState, (state: MapStateInterface) => state.selectedCity);
export const selectedMapTypeSelector = createSelector(appFeatureState, (state: MapStateInterface) => state.selectedMapType);
export const selectedChartTypeSelector = createSelector(appFeatureState, (state: MapStateInterface) => state.selectedChartType);
