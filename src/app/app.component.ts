import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  radonReportVisible: boolean = false; 
  radonReportText: string = 'View Radon Report'; 
  waterReportText: string = 'View Water Quality Report';
  waterReportVisible: boolean = false; 
  mapVisible: boolean = true; 

  
  showWaterReport(): void {
    if(!this.waterReportVisible){
      this.waterReportVisible = true; 
      this.mapVisible = false;
      this.radonReportVisible = false; 
      this.radonReportText = 'View Radon Report'
      this.waterReportText = 'Close Water Quality Report';   
    } else {
      this.waterReportVisible = false; 
      this.radonReportVisible = false; 
      this.radonReportText = 'View Radon Report'; 
      this.mapVisible = true; 
      this.waterReportText = 'View Water Quality Report';
    }
  }
  
  showRadonReport(): void {
    if(!this.radonReportVisible){
      this.radonReportVisible = true; 
      this.radonReportText = 'Close Radon Report';
      this.waterReportText = 'View Water Report';
      this.waterReportVisible = false; 
      this.mapVisible = false; 
    } else {
      this.radonReportVisible = false; 
      this.waterReportVisible = false; 
      this.mapVisible = true; 
      this.waterReportText = 'View Water Report'; 
      this.radonReportText = 'View Radon Report'; 
    }
  }
  
}
