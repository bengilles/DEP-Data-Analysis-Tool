import { Injectable } from '@angular/core'; 

@Injectable()
export class MappingService{
    map: any; 
    mapView: any;
    
    setMap(map): void { 
        this.map = map; 
        console.log(map); 
    }

    setMapView(mapView): void { 
        this.mapView = mapView; 
        console.log(mapView); 
    }

    getMap(): any {
        return this.map; 
    }

    getMapView(): any { 
        return this.mapView; 
    }
}