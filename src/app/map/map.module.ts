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
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatTooltipModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './components/data-table/button-renderer/button-renderer.component';



@NgModule({
  declarations: [MapComponent, GraphComponent, DataTableComponent, SideNavComponent, ButtonRendererComponent],
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
    MatMenuModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
