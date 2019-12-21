import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  capitals = '/assets/data/usa-capitals.geojson';

  static ScaledRadius(val: number, maxVal: number): number {
    return 25 * (val / maxVal);
  }

  constructor(private http: HttpClient,
              private popupService: PopUpService) {
  }

  makeCapitalCircleMarkers(map: L.map): void {
    this.http.get(this.capitals).subscribe((res: any) => {

      // Find the maximum population to scale the radii by.
      const maxVal = Math.max(...res.features.map(x => x.properties.population), 0);

      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const circle = L.circleMarker([lon, lat], {
          radius: MarkerService.ScaledRadius(c.properties.population, maxVal),
          color: 'black'
        });

        circle.on('click', (e) => {
          console.log(c.properties);
          map.flyTo([lon, lat], 9, {
            duration: 0.5
          });
          circle.bindPopup(this.popupService.makeCapitalPopup(c));
        });

        circle.addTo(map);
      }
    });
  }
}
