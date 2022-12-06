import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [    
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor: pointer;
    }

    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15
  center: [number, number] = [-75.60188106345224, 6.207117615574585];

  marcadores: mapboxgl.Marker[]= [];


  constructor() { }
 
  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // this.leerLocalStorage();
    // const marker = new mapboxgl.Marker()
    //   .setLngLat( this.center)
    //   .addTo(this.mapa)
  }   

  agregarMarcador() {

    const color = "#C3066D".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
     const nuevoMarcador = new mapboxgl.Marker({
       draggable: true,
       color: color
     })
     
     .setLngLat(this.center)
     .addTo(this.mapa)

     this.marcadores.push(nuevoMarcador);
     this.guardarMarcadoresLocalStorage()
  }

  irMarcador( marker: mapboxgl.Marker ) {
    this.mapa.flyTo({
      center: marker.getLngLat()
    })

  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr:any[]= []

    this.marcadores.forEach( m => {

      const {lng, lat } = m.getLngLat()
      lngLatArr.push ({
      centro: [ lng, lat ]
      })
    })   
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

  }

  // leerLocalStorage(){

  //   if(!localStorage.getItem('marcadores')){
  //     return;
  //   }
  //   const lngLatArr:any[] = JSON.parse(localStorage.getItem('marcadores')!);

  //   lngLatArr.forEach( m=> {
  //     const newMarker = new mapboxgl.Marker({
  //       draggable: true,
  //       color: m.color
  //     })
  //       .setLngLat(this.center)
  //       .addTo(this.mapa)


       
  //   })
    

     



  }

  

