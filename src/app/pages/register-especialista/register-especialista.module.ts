import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEspecialistaRoutingModule } from './register-especialista-routing.module';
import { RegisterEspecialistaComponent } from './register-especialista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaEspecialidadComponent } from 'src/app/components/tabla-especialidad/tabla-especialidad.component';


@NgModule({
  declarations: [
    RegisterEspecialistaComponent, TablaEspecialidadComponent
  ],
  imports: [
    CommonModule,
    RegisterEspecialistaRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegisterEspecialistaModule { }
