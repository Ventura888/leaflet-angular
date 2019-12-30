import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphComponent } from './components/graph/graph.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { StoreModule } from '@ngrx/store';
import { mapReducer } from './store/map.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './store/map.effects';
import { MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatTooltipModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './components/data-table/button-renderer/button-renderer.component';
import { ChartsModule } from 'ng2-charts';
import { MostPopulatedComponent } from './components/graph/charts/most-populated/most-populated.component';
import { BiggestAreaComponent } from './components/graph/charts/biggest-area/biggest-area.component';
import { CapitalSinceComponent } from './components/graph/charts/capital-since/capital-since.component';



@NgModule({
  declarations: [MapComponent, GraphComponent, DataTableComponent, ButtonRendererComponent, MostPopulatedComponent, BiggestAreaComponent, CapitalSinceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('map', mapReducer),
    EffectsModule.forFeature([MapEffects]),
    MatSidenavModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    ChartsModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
