import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { select, Store } from '@ngrx/store';
import { allCapitalsSelector } from '../../../../store/map.selectors';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-capital-since',
  templateUrl: './capital-since.component.html',
  styleUrls: ['./capital-since.component.scss']
})
export class CapitalSinceComponent implements OnInit, AfterViewInit, OnDestroy {

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

  public bubbleChartOptions: ChartOptions = {
    responsive: false,
    scales: {
      xAxes: [{
        ticks: {
          min: 1600,
          max: 1900,
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 500,
        }
      }]
    }
  };
  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;

  public bubbleChartData: ChartDataSets[] = [
    {
      data: [
        { x: 1650, y: 400, r: 10 },
        { x: 1800, y: 200, r: 15 },
        { x: 1910, y: 150, r: 23 },
        { x: 2000, y: 100, r: 8 },
      ],
      label: '',
    },
  ];

  constructor(private store: Store<any>) { }

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
    this.bubbleChartOptions = {
      responsive: false,
      scales: {
        xAxes: [{
          ticks: {
            min: this.topFiveCapitals[0].properties.capitalSince,
            max: this.topFiveCapitals[4].properties.capitalSince,
            fontColor: '#aaaaaa',
          },
          gridLines: {
            color: '#454545'
          },
          scaleLabel: {
            display: true,
            labelString: 'Timeline',
            fontColor: '#aaaaaa',
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 500,
            fontColor: '#aaaaaa',
          },
          gridLines: {
            color: '#454545'
          },
          scaleLabel: {
            display: true,
            labelString: 'Years of existance',
            fontColor: '#aaaaaa',
          }
        }]
      }
    };
    this.bubbleChartData =
      [
        {
          data: [
            { x: this.topFiveCapitals[0].properties.capitalSince, y: new Date().getFullYear() - this.topFiveCapitals[0].properties.capitalSince, r: 10 },
          ],
          label: `${this.topFiveCapitals[0].properties.name}`,
          borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'],
          backgroundColor: ['rgba(54, 162, 235, 0.5)']
        },
        {
          data: [
            { x: this.topFiveCapitals[1].properties.capitalSince, y: new Date().getFullYear() - this.topFiveCapitals[1].properties.capitalSince, r: 10 },
          ],
          label: `${this.topFiveCapitals[1].properties.name}`,
          borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'],
          backgroundColor: ['rgba(75, 192, 192, 0.5)']
        },
        {
          data: [
            { x: this.topFiveCapitals[2].properties.capitalSince, y: new Date().getFullYear() - this.topFiveCapitals[2].properties.capitalSince, r: 10 },
          ],
          label: `${this.topFiveCapitals[2].properties.name}`,
          borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'],
          backgroundColor: ['rgba(255, 205, 86, 0.5)']
        },
        {
          data: [
            { x: this.topFiveCapitals[3].properties.capitalSince, y: new Date().getFullYear() - this.topFiveCapitals[3].properties.capitalSince, r: 10 },
          ],
          label: `${this.topFiveCapitals[3].properties.name}`,
          borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'],
          backgroundColor: ['rgba(255, 159, 64, 0.5)']
        },
        {
          data: [
            { x: this.topFiveCapitals[4].properties.capitalSince, y: new Date().getFullYear() - this.topFiveCapitals[4].properties.capitalSince, r: 10 },
          ],
          label: `${this.topFiveCapitals[4].properties.name}`,
          borderColor: ['#424242', '#424242', '#424242', '#424242', '#424242'],
          backgroundColor: ['rgba(201, 203, 207, 0.5)']
        },
      ];
  }

  getTopFive(arr: Array<any>) {
    return arr.sort((a, b) => a.properties.capitalSince - b.properties.capitalSince).slice(0, 5);
  }
}
