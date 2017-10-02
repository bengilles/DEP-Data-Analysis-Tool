import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EsriLoaderService } from 'angular2-esri-loader';
    
@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.css']
})
export class MappingComponent {
    constructor(private esriLoader: EsriLoaderService) {
        console.log('Mapping Component Initialized');
    }
}
