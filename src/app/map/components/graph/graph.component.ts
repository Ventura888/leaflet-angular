import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectedChartTypeSelector } from '../../store/map.selectors';
import { filter, map, tap } from 'rxjs/operators';
import { chartTypes } from '../../models/chartTypes';
import { SelectChartType } from '../../store/map.actions';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {

  subscriptions = [];

  chartTypes = chartTypes;

  chartOptions = [
    {
      name: chartTypes.MOST_POPULATED,
      icon: 'insert_chart'
    },
    {
      name: chartTypes.BIGGEST_AREA,
      icon: 'pie_chart'
    },
    {
      name: chartTypes.CAPITAL_SINCE,
      icon: 'bubble_chart'
    }
  ];

  selectedChartType;
  selectedChartType$ = this.store.pipe(
    select(selectedChartTypeSelector),
    filter(chartType => Boolean(chartType)),
    map(chartType => chartType),
    tap(chartType => {
      this.selectedChartType = chartType;
    })
  );


  constructor(public store: Store<any>) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.selectedChartType$.subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  setChartType(payload) {
    this.store.dispatch(new SelectChartType({ selectedChartType: payload }));
  }
}
