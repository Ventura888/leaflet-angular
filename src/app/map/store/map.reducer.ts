import { mapInitState, MapStateInterface } from './map.initState';
import { GetAllCapitalsDataRes, MapActions, MapActionTypes, SelectMapType, SetSelectedCity } from './map.actions';


export function mapReducer(state: MapStateInterface = mapInitState, action: MapActions): MapStateInterface {
  switch (action.type) {
    case MapActionTypes.SET_SELECTED_CITY:
      return { ...state, selectedCity: (action as SetSelectedCity).payload.selectedCity };

    case MapActionTypes.SELECT_MAP_TYPE:
      return { ...state, selectedMapType: (action as SelectMapType).payload.selectedMapType };

    case MapActionTypes.GET_All_CAPITALS_DATA_RES:
      return { ...state, capitals: (action as GetAllCapitalsDataRes).payload.capitals };

    default: {
      return state;

    }
  }
}
