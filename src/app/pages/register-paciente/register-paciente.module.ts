import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPacienteRoutingModule } from './register-paciente-routing.module';
import { RegisterPacienteComponent } from './register-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaObrasComponent } from 'src/app/components/tabla-obra/tabla-obras.component';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";


@NgModule({
  declarations: [
    RegisterPacienteComponent, TablaObrasComponent
  ],
  imports: [
    CommonModule,
    RegisterPacienteRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],

})
export class RegisterPacienteModule { }
