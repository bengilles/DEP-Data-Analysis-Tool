import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MappingComponent } from './mapping/mapping.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { EsriLoaderService } from 'angular2-esri-loader';

@NgModule({
  declarations: [
    AppComponent,
    MappingComponent,
    EsriMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EsriLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
