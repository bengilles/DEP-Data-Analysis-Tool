import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { HttpClient } from '@angular/common/http';
import { MappingService } from '../../services/mapping.service'; 
import { EsriLoaderService } from "angular2-esri-loader";

export interface RadonData {
    radonDataIdentifier: string; 
    addressPostalCode: string; 
    countyCode: string; 
    countyName: string; 
    municipalityName: string; 
    buildingPurpose: string; 
    buildingType: string; 
    buildingSubType: string; 
    testFloorLevel: string; 
    testMethodType: string; 
    mitigationSystem: string;
    measureValue: string; 
    testStartDate: string; 
    testEndDate: string; 
}

@Component({
selector: 'app-radon-report',
templateUrl: './radon-report.component.html'
})
export class RadonReportComponent implements OnInit {
    radonData: RadonData[]; 
    years: any[] = [
        { year: '1989', code: '1989' },  
        { year: '1990', code: '1990' },  
        { year: '1991', code: '1991' },  
        { year: '1992', code: '1992' },  
        { year: '1993', code: '1993' },  
        { year: '1994', code: '1994' },  
        { year: '1995', code: '1995' },  
        { year: '1996', code: '1996' },  
        { year: '1997', code: '1997' },  
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
    selectedYear: any = { year: '2017', code: '2017' }; 
    specifiedZipcode: string = ''; 
    map: any; 
    mapView: any; 
    selectedRow: any; 
    
    constructor(private http: HttpClient, private mappingService: MappingService, private esriLoader: EsriLoaderService) {
        console.log('Radon Report Component Initialized');
        this.map = mappingService.getMap(); 
        this.mapView = mappingService.getMapView();
        console.log(this.map); 
        console.log(this.mapView); 
    }
    
    ngOnInit(): void {
        console.log('Radon Report Initialized'); 
    }

    generateReport(): void { 
        console.log(this.selectedCounty); 
        console.log(this.selectedYear); 
        if(this.selectedCounty < 10){
            this.selectedCounty = '0' + this.selectedCounty; 
        }
        let whereClause = '';
        if(this.specifiedZipcode.length > 0){
            whereClause = '?$where=' + 'address_postal_code = \'' + this.specifiedZipcode + '\'' + ' AND ' + 'date_extract_y(test_start_date) = ' + this.selectedYear;
        } else {
            whereClause = '?$where=' + 'county_code = \'' + this.selectedCounty + '\'' + ' AND ' + 'date_extract_y(test_start_date) = ' + this.selectedYear;
        }
        
        this.http.get('https://data.pa.gov/resource/7ypj-ezu6.json' + whereClause).subscribe(data => {
            this.radonData = []; 
            let response: any; 
            response = data; 
            console.log(response); 
            for(let index = 0; index < response.length; index++) {
                 var newRadonData: RadonData = {
                    radonDataIdentifier : response[index].radon_data_identifier,  
                    addressPostalCode : response[index].address_postal_code,
                    countyCode : response[index].county_code, 
                    countyName : response[index].county_name, 
                    municipalityName : response[index].municpality_value, 
                    buildingPurpose : response[index].building_purpose_code, 
                    buildingType : response[index].building_type_code, 
                    buildingSubType : response[index].building_subtype_code, 
                    testFloorLevel : response[index].test_floor_level_text, 
                    testMethodType : response[index].test_method_type_code,
                    mitigationSystem  : response[index].mitigation_system_indicator,
                    measureValue  : response[index].measure_value,
                    testStartDate  : response[index].test_start_date.replace(/T00:00:00.000/g,""),
                    testEndDate  : response[index].test_end_date.replace(/T00:00:00.000/g,""),
                    
                 }
                 this.radonData.push(newRadonData); 
            }
         });
    }
    
    exportReport(): void {
        let filename = 'RadonLevelReport.csv';

        //Add Input Parameters to CSV Value
        let finalValue = 'Radon Data Identifier, Address Postal Code, County Code, County Name, Municipality Name, Building Purpose, Building Type, Building Subtype, Test Floor Level, Test Method Type, Mitigation System,' + 
         'Measure Value, Test Start Date, Test End Date\n\n'; 
        
        for(let index = 0; index < this.radonData.length; index++){
            finalValue += this.radonData[index].radonDataIdentifier + ',' + this.radonData[index].addressPostalCode + ',' + this.radonData[index].countyCode + ',' +
                this.radonData[index].countyName + ',' + this.radonData[index].municipalityName + ',' + this.radonData[index].buildingPurpose + ',' + this.radonData[index].buildingType + ',' + 
                this.radonData[index].buildingSubType + ',' + this.radonData[index].testFloorLevel + ',' + this.radonData[index].testMethodType + ',' + this.radonData[index].mitigationSystem + ',' +
                this.radonData[index].measureValue + ',' + this.radonData[index].testStartDate + ',' + this.radonData[index].testEndDate + '\n'; 
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
            let zipcodeUrl = 'https://gisags104.dev.geodecisions.local:6443/arcgis/rest/services/DATAPP/VectorData/MapServer/6';
            let queryTask = new QueryTask({
                url: zipcodeUrl
            });
            let query = new Query(); 
            query.returnGeometry = true; 
            query.outFields = ['*']; 
            query.where = 'ZCTA5CE10 = \'' + vm.selectedRow.addressPostalCode + '\''; 
            queryTask.execute(query).then(function(results){
                console.log(results);
                vm.mapView.extent = results.features[0].geometry.extent; 
            });
        }); 
    }
}
