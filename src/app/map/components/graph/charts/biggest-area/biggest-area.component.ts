import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { select, Store } from '@ngrx/store';
import { allCapitalsSelector } from '../../../../store/map.selectors';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-biggest-area',
  templateUrl: './biggest-area.component.html',
  styleUrls: ['./biggest-area.component.scss']
})
export class BiggestAreaComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions = [];

  chartReady: boolean = false;

  topFiveCapitals;
  allCapitals$ = this.store.pipe(
    select(allCapitalsSelector),
    filter(allCapitals => Boolean(allCapitals)),
    map(allCapitals => allCapitals),
    tap(allCapitals => {
      this.topFiveCapitals = this.getTopFive(allCapitals.features);
      this.chartReady = true;
    })
  );

  public pieChartOptions: ChartOptions = {
    responsive: false,
    title: {
      display: true,
      text: 'Biggest Area Capitals (mi²)',
      fontColor: '#aaaaaa'
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#aaaaaa'
      },
    }
  };

  pieChartColors = [
    {
      backgroundColor: [
        'rgba(225,10,24,0.5)',
        'rgba(70,156,225,0.5)',
        'rgba(221,225,88,0.5)',
        'rgba(225,65,187,0.5)',
        'rgba(60,225,76,0.5)'
      ]
    }
  ];

  public pieChartLabels: Label[] = [[''], [''], [''], [''], ['']];
  public pieChartData: Array<any> = [
    {data: [0], borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'], borderWidth: [1, 1, 1, 1, 1]}
  ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private store: Store<any>) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.allCapitals$.subscribe()
    );
    this.chartReady = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initChart();
    }, 10);

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initChart() {
    this.pieChartLabels = [
      `${this.topFiveCapitals[0].properties.name}`,
      `${this.topFiveCapitals[1].properties.name}`,
      `${this.topFiveCapitals[2].properties.name}`,
      `${this.topFiveCapitals[3].properties.name}`,
      `${this.topFiveCapitals[4].properties.name}`
    ];
    this.pieChartData = [
      {
        data: [
          this.topFiveCapitals[0].properties.area,
          this.topFiveCapitals[1].properties.area,
          this.topFiveCapitals[2].properties.area,
          this.topFiveCapitals[3].properties.area,
          this.topFiveCapitals[4].properties.area
        ],
        borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'],
        borderWidth: [1, 1, 1, 1, 1]
      }
    ];

  }

  getTopFive(arr: Array<any>) {
    return arr.sort((a, b) => b.properties.area - a.properties.area).slice(0, 5);
  }
}
