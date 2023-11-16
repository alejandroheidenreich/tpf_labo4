import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialistaComponent } from './especialista.component';

const routes: Routes = [
  {
    path: '', component: EspecialistaComponent,
    children: [
      {
        path: '', loadChildren: () => import('./home/home.module')
          .then((mod) => mod.HomeModule),
      },
      {
        path: 'mis-turnos', loadChildren: () => import('./mis-turnos/mis-turnos.module')
          .then((mod) => mod.MisTurnosModule),
      },
      {
        path: 'mi-perfil', loadChildren: () => import('./mi-perfil/mi-perfil.module')
          .then((mod) => mod.MiPerfilModule),
      },
      {
        path: 'mis-horarios', loadChildren: () => import('./mis-horarios/mis-horarios.module')
          .then((mod) => mod.MisHorariosModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
