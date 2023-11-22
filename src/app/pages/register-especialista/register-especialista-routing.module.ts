import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEspecialistaComponent } from './register-especialista.component';

const routes: Routes = [
  {
    path: '', component: RegisterEspecialistaComponent,
    data: { animation: 'register' }

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterEspecialistaRoutingModule { }
