import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaComponent } from './especialista.component';

const routes: Routes = [
  {
    path: '', component: EspecialistaComponent
  },
  {
    path: 'mis-turnos', loadChildren: () => import('./mis-turnos/mis-turnos.module')
      .then((mod) => mod.MisTurnosModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
