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
     vm.esriLoader.loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/config', 'esri/widgets/Legend']).then(([Map, MapView, FeatureLayer, esriConfig, Legend]) => {
      
      esriConfig.request.corsEnabledServers.push('https://gisags104.dev.geodecisions.local:6443');
      var mapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/VectorData/MapServer/";
     
      var waterDataLayer = new FeatureLayer({
        url: mapServerUrl + '0'
      });

      var radonDataLayer = new FeatureLayer({
        url: mapServerUrl + '5'
      });
      
      vm.map = new Map({ 
        basemap: 'satellite', 
        ground: 'world-elevation', 
        showAttribution: false
      });
      
      vm.map.add(waterDataLayer);
      vm.map.add(radonDataLayer);
      
      vm.mapView = new MapView({
        id: 'view',
        container: 'view', 
        map: vm.map, 
        heightBreakPoint: 'large', 
        widthBreakPoint: 'large'
      });

      var legend = new Legend({
        view: vm.mapView,
        layerInfos: [
          {
            layer: waterDataLayer,
            title: "Water Quality Data"
          },{
            layer: radonDataLayer,
            title: "Radon Municipality Data"
          }
        ]
      });

      // Add widget to the bottom right corner of the view
      vm.mapView.ui.add(legend, "bottom-right");

      function identifyCallback(result) {
        
      }

      function executeIdentify(point) {
        debugger;
      }

      vm.mapView.on("click", function(event) {
        executeIdentify(event.mapPoint);
      });

      vm.mappingService.setMap(vm.map); 
      vm.mappingService.setMapView(vm.mapView); 

     });
   });
 }
}