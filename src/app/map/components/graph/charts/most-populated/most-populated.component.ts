import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { select, Store } from '@ngrx/store';
import { allCapitalsSelector } from '../../../../store/map.selectors';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-most-populated',
  templateUrl: './most-populated.component.html',
  styleUrls: ['./most-populated.component.scss']
})
export class MostPopulatedComponent implements OnInit, AfterViewInit, OnDestroy {

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

  public barChartOptions: ChartOptions = {
    responsive: false,
    title: {
      display: true,
      text: 'Most Populated Capitals',
      fontColor: '#aaaaaa'
    },
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          fontColor: '#aaaaaa',  // x axe labels (can be hexadecimal too)
        },
        gridLines: {
          color: '#454545'  // grid line color (can be removed or changed)
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: '#aaaaaa',  // y axes numbers color (can be hexadecimal too)
          min: 0,
          beginAtZero: true,

        },
        gridLines: {
          color: '#454545'  // grid line color (can be removed or changed)
        },
        scaleLabel: {
          display: true,
          labelString: 'Population',
          fontColor: '#aaaaaa',  // y axe label color (can be hexadecimal too)
        }
      }]
    },
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [] }
  ];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(70,156,225,0.5)',
      borderColor: 'rgba(70,156,225,0.5)',
      pointBackgroundColor: 'rgba(70,156,225,0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(70,156,225,0.5)'
    },
    {
      backgroundColor: 'rgba(225,10,24,0.5)',
      borderColor: 'rgba(225,10,24,0.5)',
      pointBackgroundColor: 'rgba(225,10,24,0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.5)'
    }
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
    this.barChartLabels = [
      `${this.topFiveCapitals[0].properties.name}, ${this.topFiveCapitals[0].properties.state}`,
      `${this.topFiveCapitals[1].properties.name}, ${this.topFiveCapitals[1].properties.state}`,
      `${this.topFiveCapitals[2].properties.name}, ${this.topFiveCapitals[2].properties.state}`,
      `${this.topFiveCapitals[3].properties.name}, ${this.topFiveCapitals[3].properties.state}`,
      `${this.topFiveCapitals[4].properties.name}, ${this.topFiveCapitals[4].properties.state}`
    ];
    this.barChartData = [
      {
        data: [
          this.topFiveCapitals[0].properties.population,
          this.topFiveCapitals[1].properties.population,
          this.topFiveCapitals[2].properties.population,
          this.topFiveCapitals[3].properties.population,
          this.topFiveCapitals[4].properties.population,
        ]
      }
    ];
  }

  getTopFive(arr: Array<any>) {
    return arr.sort((a, b) => b.properties.population - a.properties.population).slice(0, 5);
  }

}
