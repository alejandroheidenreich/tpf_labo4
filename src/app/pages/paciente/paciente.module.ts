import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { NavbarModule } from 'src/app/modules/navbar/navbar.module';


@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    NavbarModule
  ]
})
export class PacienteModule { }
