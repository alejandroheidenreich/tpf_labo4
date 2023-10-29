import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPacienteComponent } from './register-paciente.component';

const routes: Routes = [
  {
    path: '', component: RegisterPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPacienteRoutingModule { }
