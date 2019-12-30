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
        ticks: {
          fontColor: '#aaaaaa',  // x axe labels (can be hexadecimal too)
        },
        gridLines: {
          color: '#454545'  // grid line color (can be removed or changed)
        }
      }],
      yAxes: [{
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
  public barChartLabels: Label[] = ['Top 5 Populated Capitals'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [] }
  ];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      pointBackgroundColor: 'rgba(54, 162, 235, 0.5)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: 'rgba(54, 162, 235, 0.5)'
    },
    {
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 0.5)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: 'rgba(75, 192, 192, 0.5)'
    },
    {
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
      borderColor: 'rgba(255, 205, 86, 1)',
      pointBackgroundColor: 'rgba(255, 205, 86, 0.5)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: 'rgba(255, 205, 86, 0.5)'
    },
    {
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      borderColor: 'rgba(255, 159, 64, 1)',
      pointBackgroundColor: 'rgba(255, 159, 64, 0.5)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: 'rgba(255, 159, 64, 0.5)'
    },
    {
      backgroundColor: 'rgba(201, 203, 207, 0.5)',
      borderColor: 'rgba(201, 203, 207, 1)',
      pointBackgroundColor: 'rgba(201, 203, 207, 0.5)',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#000',
      pointHoverBorderColor: 'rgba(201, 203, 207, 0.5)'
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
    const barChartClone = [];
    for (let i = 0 ; i < 5; i++) {
      barChartClone.push({
        data: [this.topFiveCapitals[i].properties.population],
        label: `${this.topFiveCapitals[i].properties.name}`
      })
    }
    this.barChartData = barChartClone;
  }

  getTopFive(arr: Array<any>) {
    return arr.sort((a, b) => b.properties.population - a.properties.population).slice(0, 5);
  }

}
