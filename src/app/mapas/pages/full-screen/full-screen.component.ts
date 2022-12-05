import { Component, OnInit } from '@angular/core';
import  * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [    
    `
    #mapa{
      width: 100%;
      height: 100%;
    }
    `
  ]
}) 
export class FullScreenComponent implements OnInit {

  ngOnInit(): void {    
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.60188106345224, 6.207117615574585],
      zoom: 15

    });    
    
  } 
 
}
