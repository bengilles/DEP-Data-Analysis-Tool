import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { HttpClient } from '@angular/common/http';

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
templateUrl: './water-report.component.html',
styleUrls: ['./water-report.component.css']
})
export class WaterReportComponent implements OnInit {
    waterData: WaterData[]; 
    
    constructor(private http: HttpClient) {
        console.log('Water Report Component Initialized');
    }
    
    ngOnInit(): void {
        this.http.get('https://data.pa.gov/resource/x7jf-72k4.json').subscribe(data => {
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
                    activityDate: response[index].activity_start_date, 
                    resultMethodName: response[index].result_method_name, 
                    resultMeasureValue: response[index].result_measure_value + response[index].result_measure_unit_code, 
                    countyCode: response[index].county_code
                }
                this.waterData.push(newWaterData); 
           }
        });
    }
}
