import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterEspecialistaRoutingModule } from './register-especialista-routing.module';
import { RegisterEspecialistaComponent } from './register-especialista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaEspecialidadComponent } from 'src/app/components/tabla-especialidad/tabla-especialidad.component';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";


@NgModule({
  declarations: [
    RegisterEspecialistaComponent, TablaEspecialidadComponent
  ],
  imports: [
    CommonModule,
    RegisterEspecialistaRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ]
})
export class RegisterEspecialistaModule { }
