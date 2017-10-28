import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { HttpClient } from '@angular/common/http';




@Component({
selector: 'app-water-report',
templateUrl: './water-report.component.html',
styleUrls: ['./water-report.component.css']
})
export class WaterReportComponent implements OnInit {
    waterData: any;
    
    constructor(private http: HttpClient) {
        console.log('Water Report Component Initialized');
    }
    
    ngOnInit(): void {
        this.http.get('https://data.pa.gov/resource/x7jf-72k4.json').subscribe(data => {
           this.waterData = data; 
           console.log(this.waterData); 
        });
    }
}
