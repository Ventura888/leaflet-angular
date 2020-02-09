import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { ShapeService } from '../../services/shape.service';
import { SelectMapType } from '../../store/map.actions';
import { select, Store } from '@ngrx/store';
import { selectedMapTypeSelector } from '../../store/map.selectors';
import { map, tap } from 'rxjs/operators';
import { mapTypes } from '../../models/mapTypes';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit, OnDestroy {

  subscriptions = [];
  map;
  states;

  mapTypes = mapTypes;

  selectedMapType;
  selectedMapType$ = this.store.pipe(
    select(selectedMapTypeSelector),
    map((selectedMapType) => selectedMapType),
    tap((selectedMapType) => this.selectedMapType = selectedMapType)
  );

  constructor(private markerService: MarkerService,
              private shapeService: ShapeService,
              private store: Store<any>
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.selectedMapType$.subscribe()
    )
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 0)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: 'rgba(0,0,0,0.25)',
        fillOpacity: 0.8,
        fillColor: 'rgba(255,255,255,0.15)'
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }

  private highlightFeature(e)  {
    const layer = e.target;
    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '',
      fillOpacity: 0.8,
      fillColor: 'rgba(0,80,255,0.15)'
    });
  }

  private resetFeature(e)  {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: 'rgba(0,0,0,0.25)',
      fillOpacity: 0.8,
      fillColor: 'rgba(255,255,255,0.15)'
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 30
    });

    tiles.addTo(this.map);
    this.markerService.makeCapitalCircleMarkers(this.map);
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
  }

  switchMapType(mapType) {
    this.store.dispatch(new SelectMapType({selectedMapType: mapType}));
    this.map.off();
    this.map.remove();
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });

    const tiles = L.tileLayer(`${mapType.url}`, {
      maxZoom: 30
    });

    tiles.addTo(this.map);
    this.markerService.makeCapitalCircleMarkers(this.map);
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      this.initStatesLayer();
    });
  }
}
