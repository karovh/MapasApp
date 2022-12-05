import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { createViewChild } from '@angular/compiler/src/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }
    .row{
      background-color: white;
      border-radius: 5px;
      position: fixed;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      z-index: 9999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10
  center: [number, number] = [-75.60188106345224, 6.207117615574585];

  constructor(){}

  ngOnDestroy(): void {
    this.mapa.off('zoom',() => {});
    this.mapa.off('zoomend',() => {});
    this.mapa.off('move',() => {});
  }

  
  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map ({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });     
    
    this.mapa.on('zoom', (ev)=>{
       this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if ( this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo (18);
      }
    });

    //moviemiento del mapa

    this.mapa.on('move',(event) =>{
      const target = event.target;
      const { lng, lat } = target.getCenter()
      this.center = [lng, lat]

    })
  } 

    zoomOut(){
      this.mapa.zoomOut();  
    }
    zoomIn(){
      this.mapa.zoomIn();   
    }
    zoomCambio(valor: string){
      this.mapa.zoomTo(Number(valor));
    }

}
