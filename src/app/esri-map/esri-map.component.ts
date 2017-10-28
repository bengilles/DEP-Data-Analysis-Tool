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
     vm.esriLoader.loadModules(['esri/Basemap', 'esri/config', 'esri/geometry/Extent', 'esri/layers/FeatureLayer', 'esri/widgets/Legend', 'esri/Map', 'esri/views/MapView', 'esri/layers/TileLayer']).then(([BaseMap, esriConfig, Extent, FeatureLayer, Legend , Map, MapView, TileLayer]) => {
      
      esriConfig.request.corsEnabledServers.push('https://gisags104.dev.geodecisions.local:6443');
      var radonBaseMapUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/RadonBaseMap/MapServer/";
      var vectorMapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/VectorData/MapServer/";
      var radon1980MapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/MedianRadon1980s/MapServer";
     
      var radonBaseLayer = new TileLayer({
          url: radonBaseMapUrl
      });

      var waterDataLayer = new FeatureLayer({
        url: vectorMapServerUrl + '0'
      });

      var radon1980Layer = new TileLayer({
        url: radon1980MapServerUrl
      })
      
      vm.map = new Map({ 
        basemap: new BaseMap({
          baseLayers: [radonBaseLayer]
        }),
        ground: 'world-elevation', 
        showAttribution: false
      });
      
      vm.mapView = new MapView({
        id: 'view',
        container: 'view', 
        map: vm.map, 
        heightBreakPoint: 'large', 
        widthBreakPoint: 'large'
      });

      vm.mapView.extent = new Extent({
        xmin: -8948303.602774117,
        xmax: -8361267.225544245,
        ymin: 4864173.156473289,
        ymax: 5130785.511131856,
        spatialReference: {
          wkid: 102100
        }
      });

      vm.map.add(waterDataLayer);
      vm.map.add(radon1980Layer);

      var legend = new Legend({
        view: vm.mapView,
        layerInfos: [{
            layer: waterDataLayer,
            title: "Water Quality Data"
          },{
            layer: radon1980Layer,
            title: "Radon Municipality Data (1980-1990)"
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