import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { HttpClient } from '@angular/common/http';
import { MappingService } from '../../services/mapping.service'; 
import { EsriLoaderService } from "angular2-esri-loader";

export interface WaterData {
    monitoringLocationName: string; 
    monitoringLocationDescription: string; 
    monitoringLocationType: string; 
    latitude: string; 
    longitude: string; 
    activityType: string; 
    activityDate: string; 
    resultMethodName: string; 
    resultMeasureValue: string; 
    countyCode: string; 
}

@Component({
selector: 'app-water-report',
templateUrl: './water-report.component.html'
})
export class WaterReportComponent implements OnInit {
    waterData: WaterData[]; 
    years: any[] = [
        { year: '1998', code: '1998' },  
        { year: '1999', code: '1999' },
        { year: '2000', code: '2000' },
        { year: '2002', code: '2002' },
        { year: '2003', code: '2003' },
        { year: '2004', code: '2004' },
        { year: '2005', code: '2005' },
        { year: '2006', code: '2006' },
        { year: '2007', code: '2007' },
        { year: '2008', code: '2008' },
        { year: '2009', code: '2009' },
        { year: '2010', code: '2010' },
        { year: '2011', code: '2011' },
        { year: '2012', code: '2012' },
        { year: '2013', code: '2013' },
        { year: '2014', code: '2014' },
        { year: '2015', code: '2015' },
        { year: '2016', code: '2016' },
        { year: '2017', code: '2017' },
    ];
    counties: any[] = [
        {county:'Adams', code: 1}, 
        {county:'Allegheny', code: 2},
        {county:'Armstrong', code: 3},
        {county:'Beaver', code: 4},
        {county:'Bedford', code: 5},
        {county:'Berks', code: 6},
        {county:'Blair', code: 7},
        {county:'Bradford', code: 8},
        {county:'Bucks', code: 9},
        {county:'Butler', code: 10},     
        {county:'Cambria', code: 11},
        {county:'Cameron', code: 12},
        {county:'Carbon', code: 13},
        {county:'Centre', code: 14},
        {county:'Chester', code: 15},
        {county:'Clarion', code: 16},
        {county:'Clearfield', code: 17},
        {county:'Clinton', code: 18},
        {county:'Columbia', code: 19},
        {county:'Crawford', code: 20},
        {county:'Cumberland', code: 21},
        {county:'Dauphin', code: 22},
        {county:'Delaware', code: 23},
        {county:'Elk', code: 24},
        {county:'Erie', code: 25},
        {county:'Fayette', code: 26},
        {county:'Forest', code: 27},
        {county:'Franklin', code: 28},
        {county:'Fulton', code: 29},
        {county:'Greene', code: 30},
        {county:'Huntingdon', code: 31},
        {county:'Indiana', code: 32},
        {county:'Jefferson', code: 33},
        {county:'Juniata', code: 34},
        {county:'Lackawanna', code: 35},
        {county:'Lancaster', code: 36},
        {county:'Lawrence', code: 37},
        {county:'Lebanon', code: 38},
        {county:'Lehigh', code: 39},
        {county:'Luzerne', code: 40},
        {county:'Lycoming', code: 41},
        {county:'McKean', code: 42},
        {county:'Mercer', code: 43},
        {county:'Mifflin', code: 44},
        {county:'Monroe', code: 45},
        {county:'Montgomery', code: 46},
        {county:'Montour', code: 47},
        {county:'Northampton', code: 48},
        {county:'Northumberland', code: 49},
        {county:'Perry', code: 50},
        {county:'Philidelphia', code: 51},
        {county:'Pike', code: 52},
        {county:'Potter', code: 53},
        {county:'Schuylkill', code: 54},
        {county:'Snyder', code: 55},
        {county:'Somerset', code: 56},
        {county: 'Sullivan', code: 57},
        {county:'Susquehanna', code: 58},
        {county:'Tioga', code: 59},
        {county:'Union', code: 60},
        {county:'Venango', code: 61},
        {county:'Warren', code: 62},
        {county:'Washington', code: 63},
        {county:'Wayne', code: 64},
        {county:'Westmoreland', code: 65},
        {county:'Wyoming', code: 66},
        {county:'York', code: 67},
    ];
    selectedCounty: any = { county:'Adams', code: 1 }; 
    selectedYear: any = { year: '1998', code: '1998' }; 
    map: any; 
    mapView: any; 
    selectedRow: any; 
    
    constructor(private http: HttpClient, private mapService: MappingService, private esriLoader: EsriLoaderService) {
        console.log('Water Report Component Initialized');
        this.map = mapService.getMap(); 
        this.mapView = mapService.getMapView(); 
        console.log(this.map); 
        console.log(this.mapView)
    }
    
    ngOnInit(): void {
        console.log('Water Report Initialized'); 
    }

    generateReport(): void { 
        console.log(this.selectedCounty); 
        console.log(this.selectedYear); 
        let whereClause = '?$where=' + 'county_code = \'' + this.selectedCounty + '\'' + ' AND ' + 'date_extract_y(activity_start_date) = ' + this.selectedYear; 
        this.http.get('https://data.pa.gov/resource/x7jf-72k4.json' + whereClause).subscribe(data => {
            this.waterData = []; 
            let response: any; 
            response = data; 
            console.log(response); 
            for(let index = 0; index < response.length; index++) {
                 var newWaterData: WaterData = {
                     monitoringLocationName: response[index].monitoring_location_name, 
                     monitoringLocationDescription: response[index].monitoring_location_description,
                     monitoringLocationType: response[index].monitoring_location_name, 
                     longitude: response[index].longitude, 
                     latitude: response[index].latitude, 
                     activityType: response[index].activity_type_code, 
                     activityDate: response[index].activity_start_date.replace(/T00:00:00.000/g,""), 
                     resultMethodName: response[index].result_method_name, 
                     resultMeasureValue: response[index].result_measure_value + response[index].result_measure_unit_code, 
                     countyCode: response[index].county_code
                 }
                 this.waterData.push(newWaterData); 
            }
         });
    }
    
    exportReport(): void {
        let filename = 'WaterQualityReport.csv';

        //Add Input Parameters to CSV Value
        let finalValue = 'Monitoring Location Name, Monitoring Location Description, Monitoring Location Type, Longitude, Latitude, Activity Type, Activity Date, Result Method Name, Result Measure Value, County Code\n\n'; 
        
        for(let index = 0; index < this.waterData.length; index++){
            finalValue += this.waterData[index].monitoringLocationName + ',' + this.waterData[index].monitoringLocationDescription + ',' + this.waterData[index].monitoringLocationType + ',' +
                this.waterData[index].longitude + ',' + this.waterData[index].latitude + ',' + this.waterData[index].activityType + ',' + this.waterData[index].activityDate + ',' + 
                this.waterData[index].resultMethodName.replace(/,/g,"") + ',' + this.waterData[index].resultMeasureValue + ',' + this.waterData[index].countyCode + '\n'; 
        }

        let blob = new Blob([finalValue], { type: 'text/csv;charset-utf-8;' });
        if (navigator.msSaveBlob) { //IE 10+
            navigator.msSaveBlob(blob, filename);
        } else { 
            let link = document.createElement('a');
            let myLink = link;
            if (myLink.download !== undefined) { //feature detection
                // Browsers that support HTML5 download attribute
                console.log('Starting Download');
                let url = URL.createObjectURL(blob);
                myLink.setAttribute('href', url);
                myLink.setAttribute('download', filename);
                myLink.style.visibility = 'hidden';
                document.body.appendChild(myLink);
                myLink.click();
                document.body.removeChild(myLink);
            }
        }
    }
    
    handleRowSelect($event): void {
        let vm = this; 
        console.log($event); 
        console.log(vm.selectedRow); 
        vm.esriLoader.loadModules(['esri/tasks/QueryTask', 'esri/tasks/support/Query', 'esri/geometry/Extent']).then(([QueryTask, Query, Extent]) => {
            let waterUrl = 'https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/VectorData/MapServer/0';
            let queryTask = new QueryTask({
                url: waterUrl
            });
            let query = new Query(); 
            query.returnGeometry = true; 
            query.outFields = ['*']; 
            query.where = 'WaterQuality_Monitoring_Locat_1 = \'' + vm.selectedRow.monitoringLocationName + '\''; 
            queryTask.execute(query).then(function(results){
                console.log(results);
                let newExtent = new Extent({
                    xmax: results.features[0].geometry.x + 1000,
                    xmin: results.features[0].geometry.x - 1000, 
                    ymax: results.features[0].geometry.y + 1000,
                    ymin: results.features[0].geometry.y - 1000, 
                    spatialReference: {wkid: results.features[0].geometry.spatialReference.wkid}
                });
                console.log('here');
                vm.mapView.extent = newExtent; 
            });
        }); 
    }
}
