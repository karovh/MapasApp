import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fullScreen',
        component: FullScreenComponent
      },
      {
        path: 'zoon-range',
        component: ZoomRangeComponent
      },
      {
        path: 'marcadores',
        component: MarcadoresComponent
      },
      {
        path: 'propiedades',
        component: PropiedadesComponent
      },
      {
        path: '**',
        redirectTo: 'fullScreen'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
