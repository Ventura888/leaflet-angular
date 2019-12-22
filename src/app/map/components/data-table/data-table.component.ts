import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { allCapitalsSelector } from '../../store/map.selectors';
import { filter, map, tap } from 'rxjs/operators';
import { MarkerService } from '../../services/marker.service';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {

  subscriptions = [];

  @Input() map;
  frameworkComponents: any;

  capitals: Array<any>;
  capitals$ = this.store.pipe(
    select(allCapitalsSelector),
    filter(capitals => Boolean(capitals)),
    map(capitals => capitals),
    tap(capitals => this.capitals = capitals.features)
  );

  constructor(private store: Store<any>, private markerService: MarkerService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent
    };
  }

  columnDefs = [
    { headerName: 'Name', field: 'properties.name', sortable: true, filter: true, flex: 1, lockVisible: true },
    { headerName: 'State', field: 'properties.state', sortable: true, filter: true, flex: 1, lockVisible: true },
    { headerName: 'Population', field: 'properties.population', sortable: true, filter: true, flex: 1, lockVisible: true },
    { headerName: 'Capital Since', field: 'properties.capitalSince', sortable: true, filter: true, flex: 1, lockVisible: true },
    { headerName: 'Coordinates', field: 'geometry.coordinates', sortable: true, filter: true, flex: 1, lockVisible: true },
    {
      headerName: 'Actions',
      flex: 1,
      lockVisible: true,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.flyTo.bind(this),
        label: 'Click 1'
      }
    }
  ];

  ngOnInit() {
    this.subscriptions.push(
      this.capitals$.subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  flyTo(e) {
    this.markerService.flyTo(this.map, e.rowData.geometry.coordinates[1], e.rowData.geometry.coordinates[0]);
  }
}
