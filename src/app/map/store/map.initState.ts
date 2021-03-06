import { chartTypes } from '../models/chartTypes';

export interface MapStateInterface {
  capitals: any;
  selectedCity: any;
  selectedMapType: any;
  selectedChartType: any;
}


export const mapInitState: MapStateInterface = {
  capitals: undefined,
  selectedCity: null,
  selectedMapType: {
    name: 'Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  selectedChartType: chartTypes.MOST_POPULATED
};
