import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WaterReportComponent } from './reports/water-report/water-report.component'; 
import { MappingComponent } from './mapping/mapping.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EsriLoaderService } from 'angular2-esri-loader';
import { MappingService } from './services/mapping.service'; 


@NgModule({
  declarations: [
    AppComponent,
    WaterReportComponent, 
    MappingComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    DataTableModule, 
    SharedModule
  ],
  providers: [EsriLoaderService, MappingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
