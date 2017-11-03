import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { EsriLoaderService } from "angular2-esri-loader";
import { MappingService } from "../services/mapping.service";

declare var jquery:any;
declare var $ :any;

@Component({
 selector: "app-esri-map",
 templateUrl: "./esri-map.component.html",
 styleUrls: ["./esri-map.component.css"]
})
export class EsriMapComponent {
 @ViewChild("map") mapEl;
 
 map: any;
 mapView: any;
 
 constructor(private esriLoader: EsriLoaderService, private mappingService: MappingService, private http: HttpClient) { }

 ngAfterViewInit() {
  var vm = this; 
  
  // only load the ArcGIS API for JavaScript when this component is loaded
   return vm.esriLoader.load({
     // use a specific version of the API instead of the latest
     url: "//js.arcgis.com/4.5/"
   }).then(() => {
    // load the map class needed to create a new map
    vm.esriLoader.loadModules(["esri/Basemap", "esri/config", "esri/geometry/Extent", "esri/layers/FeatureLayer", "esri/tasks/support/FeatureSet", "esri/tasks/Geoprocessor", "esri/widgets/LayerList", "esri/widgets/Legend", "esri/Map", "esri/views/MapView", "esri/geometry/Point", "esri/geometry/SpatialReference", "esri/layers/TileLayer"]).then(([BaseMap, esriConfig, Extent, FeatureLayer, FeatureSet, GeoProcessor, LayerList, Legend , Map, MapView, Point, SpatialReference, TileLayer]) => {
    
    esriConfig.request.corsEnabledServers.push("https://gisags104.dev.geodecisions.local:6443");

    var radonDataReturn;
    var geoProcessor = new GeoProcessor({
      url: "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/ReturnRadonLevels/GPServer/ReturnRadonLevels/"
    });

    var hardcodedUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/ReturnRadonLevels/GPServer/ReturnRadonLevels/execute?InputPoints=%7B%22displayFieldName%22%3A%22%22%2C%0D%0A%22fieldAliases%22%3A%7B%22OBJECTID%22%3A%22OBJECTID%22%7D%2C%0D%0A%22geometryType%22%3A%22esriGeometryPoint%22%2C%0D%0A%22spatialReference%22%3A%7B%22wkid%22%3A102729%2C%22latestWkid%22%3A2272%7D%2C%0D%0A%22fields%22%3A%5B%7B%22name%22%3A%22OBJECTID%22%2C%22type%22%3A%22esriFieldTypeOID%22%2C%22alias%22%3A%22OBJECTID%22%7D%5D%2C%0D%0A%22features%22%3A%5B%0D%0A%7B%22attributes%22%3A%7B%22OBJECTID%22%3A1%7D%2C%0D%0A+%22geometry%22%3A%7B%22x%22%3AXCOORDINATE%2C%22y%22%3AYCOORDINATE%7D%0D%0A%7D%0D%0A%5D%0D%0A%7D&env%3AoutSR=&env%3AprocessSR=&returnZ=false&returnM=false&f=pjson";

    geoProcessor.outSpatialReference = {
      wkid: 102729
    };
    var radonBaseMapUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/RadonBaseMap/MapServer/";
    var radon1980MapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/Radon1980/MapServer";
    var radon1990MapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/Radon1990/MapServer";
    var radon2000MapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/Radon2000/MapServer";
    var radon2010MapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/Radon2010/MapServer";
    var vectorMapServerUrl = "https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/VectorData/MapServer/";
    
    var radonBaseLayer = new TileLayer({
        url: radonBaseMapUrl
    });

    var radon1980Layer = new TileLayer({
      title: "Radon Municipality Data (1980-1990)",
      url: radon1980MapServerUrl,
      visible: true
    });

    var radon1990Layer = new TileLayer({
      title: "Radon Municipality Data (1990-2000)",
      url: radon1990MapServerUrl,
      visible: false
    });

    var radon2000Layer = new TileLayer({
      title: "Radon Municipality Data (2000-2010)",
      url: radon2000MapServerUrl,
      visible: false
    });

    var radon2010Layer = new TileLayer({
      title: "Radon Municipality Data (2010-Present)",
      url: radon2010MapServerUrl,
      visible: false
    });

    var waterDataLayer = new FeatureLayer({
      title: "Water Quality Data",
      url: vectorMapServerUrl + "0",
      visible: false
    });
    
    vm.map = new Map({ 
      basemap: new BaseMap({
        baseLayers: [radonBaseLayer]
      }),
      ground: "world-elevation", 
      showAttribution: false
    });
    
    vm.mapView = new MapView({
      id: "view",
      container: "view", 
      map: vm.map, 
      heightBreakPoint: "large", 
      widthBreakPoint: "large"
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

    vm.map.add(radon1980Layer);
    vm.map.add(radon1990Layer);
    vm.map.add(radon2000Layer);
    vm.map.add(radon2010Layer);
    vm.map.add(waterDataLayer);

    var legend = new Legend({
      view: vm.mapView,
      layerInfos: [{
          layer: radon1980Layer,
          title: "Radon Municipality Data (1980-1990)"
        },{
          layer: radon1990Layer,
          title: "Radon Municipality Data (1990-2000)"
        },{
          layer: radon2000Layer,
          title: "Radon Municipality Data (2000-2010)"
        },{
          layer: radon2010Layer,
          title: "Radon Municipality Data (2010-Present)"
        },{
          layer: waterDataLayer,
          title: "Water Quality Data"
        }
      ]
    });
    
    function defineActions(event) {
      var item = event.item;

      item.actionsSections = [
        [{
          title: "Max Extent",
          className: "esri-icon-zoom-out-fixed",
          id: "maxExtent"
        }, {
          title: "Layer Information",
          className: "esri-icon-description",
          id: "layerInformation"
        }]
      ];
    }

    var layerList = new LayerList({
      view: vm.mapView,
      // executes for each ListItem in the LayerList
      listItemCreatedFunction: defineActions
    });

    layerList.on("trigger-action", function(event) {
      // The layer visible in the view at the time of the trigger.
      debugger;
      var visibleLayer = waterDataLayer.visible ? waterDataLayer : radon1980Layer;
    
      var id = event.action.id;
    
      if (id === "maxExtent") {
        vm.mapView.goTo(visibleLayer.fullExtent);
    
      } else if (id === "layerInformation") {
        debugger;
      }
    });

    // Add widgets
    vm.mapView.ui.add(layerList, "top-right");
    vm.mapView.ui.add(legend, "bottom-right");

    function executeGeoProcessor(point) {
      var outUrl = hardcodedUrl.replace("XCOORDINATE", point.x).replace("YCOORDINATE", point.y);
      
      vm.http.get(outUrl).subscribe(data => {
        let response: any;
        response = data;

        $.each(response.results, function(index, item) {
          switch(item.paramName) {
            case "MinRadon":
              $("#radonMinText").text(item.value);
              break;
            case "MedianRadon":
              $("#radonMedianText").text(item.value);
              break;
            case "MaxRadon":
              $("#radonMaxText").text(item.value);
              break;
          }
        });

        $("#divRadonIdentifyModal").modal();
      });
    }

    vm.mapView.on("click", function(event) {
      executeGeoProcessor(event.mapPoint);
    });

    vm.mappingService.setMap(vm.map); 
    vm.mappingService.setMapView(vm.mapView);
    });
  });
 }
}