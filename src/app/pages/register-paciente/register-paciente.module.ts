import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPacienteRoutingModule } from './register-paciente-routing.module';
import { RegisterPacienteComponent } from './register-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaObrasComponent } from 'src/app/components/tabla-obra/tabla-obras.component';


@NgModule({
  declarations: [
    RegisterPacienteComponent, TablaObrasComponent
  ],
  imports: [
    CommonModule,
    RegisterPacienteRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegisterPacienteModule { }
