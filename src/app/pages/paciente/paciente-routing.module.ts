import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteComponent } from './paciente.component';

const routes: Routes = [
  {
    path: '', component: PacienteComponent,
    children: [
      {
        path: 'mis-turnos',
        loadChildren: () => import('./mis-turnos/mis-turnos.module')
          .then((mod) => mod.MisTurnosModule),
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
