import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  radonReportVisible: boolean = false; 
  waterReportText: string = 'View Water Quality Report';
  waterReportVisible: boolean = false; 
  mapVisible: boolean = true; 

  
  showWaterReport(): void {
    if(!this.waterReportVisible){
      this.waterReportVisible = true; 
      this.mapVisible = false;
      this.waterReportText = 'Hide Water Quality Report';   
    } else {
      this.waterReportVisible = false; 
      this.mapVisible = true; 
      this.waterReportText = 'View Water Quality Report';
    }
  }
  
}
