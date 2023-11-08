import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { HorariosComponent } from 'src/app/components/horarios/horarios.component';


@NgModule({
  declarations: [
    MiPerfilComponent, HorariosComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule
  ]
})
export class MiPerfilModule { }
