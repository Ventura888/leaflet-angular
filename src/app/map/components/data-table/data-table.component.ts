import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { allCapitalsSelector } from '../../store/map.selectors';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {

  subscriptions = [];

  capitals: Array<any>;
  capitals$ = this.store.pipe(
    select(allCapitalsSelector),
    filter(capitals => Boolean(capitals)),
    map(capitals => capitals),
    tap(capitals => this.capitals = capitals.features)
  );

  constructor(private store: Store<any>) { }

  columnDefs = [
    {headerName: 'Name', field: 'properties.name', sortable: true, filter: true, flex: 1, lockVisible: true},
    {headerName: 'State', field: 'properties.state', sortable: true, filter: true, flex: 1, lockVisible: true},
    {headerName: 'Population', field: 'properties.population', sortable: true, filter: true, flex: 1, lockVisible: true},
    {headerName: 'Capital Since', field: 'properties.capitalSince', sortable: true, filter: true, flex: 1, lockVisible: true},
    {headerName: 'Coordinates', field: 'geometry.coordinates', sortable: true, filter: true, flex: 1, lockVisible: true}
  ];

  ngOnInit() {
    this.subscriptions.push(
      this.capitals$.subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
