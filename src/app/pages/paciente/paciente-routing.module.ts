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
      },
      {
        path: 'solicitar-turno',
        loadChildren: () => import('./solicitar-turno/solicitar-turno.module')
          .then((mod) => mod.SolicitarTurnoModule),
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('./mi-perfil/mi-perfil.module')
          .then((mod) => mod.MiPerfilModule),
      },
      {
        path: 'solicitar-turno',
        loadChildren: () => import('./solicitar-turno/solicitar-turno.module')
          .then((mod) => mod.SolicitarTurnoModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
