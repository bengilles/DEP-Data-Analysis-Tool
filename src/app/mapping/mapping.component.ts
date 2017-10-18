import { Component, DoCheck } from '@angular/core';
    
@Component({
    selector: 'app-mapping',
    templateUrl: './mapping.component.html',
    styleUrls: ['./mapping.component.css']
})
export class MappingComponent {
    constructor() {
        console.log('Mapping Component Initialized');
    }
}
