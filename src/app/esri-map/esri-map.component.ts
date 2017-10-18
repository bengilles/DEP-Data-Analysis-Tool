import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EsriLoaderService } from 'angular2-esri-loader';
import { MappingService } from '../services/mapping.service'; 

@Component({
 selector: 'app-esri-map',
 templateUrl: './esri-map.component.html',
 styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent {
 @ViewChild('map') mapEl;
 
 map: any;
 mapView: any;
 
 constructor(private esriLoader: EsriLoaderService, private mappingService: MappingService) { }

 ngAfterViewInit() {
  var vm = this; 
  
  // only load the ArcGIS API for JavaScript when this component is loaded
   return vm.esriLoader.load({
     // use a specific version of the API instead of the latest
     url: '//js.arcgis.com/4.5/'
   }).then(() => {
     // load the map class needed to create a new map
     vm.esriLoader.loadModules(['esri/Map', 'esri/views/MapView']).then(([Map, MapView]) => {
       vm.map = new Map({ 
         basemap: 'satellite', 
         ground: 'world-elevation'
       });
       
       vm.mapView = new MapView({
         id: 'view',
         container: 'view', 
         map: vm.map, 
         heightBreakPoint: 'large', 
         widthBreakPoint: 'large'
       });

        vm.mappingService.setMap(vm.map); 
        vm.mappingService.setMapView(vm.mapView); 

     });
   });
 }
}