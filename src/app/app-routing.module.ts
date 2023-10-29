import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notloggedGuard } from './guards/notlogged.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/welcome/welcome.module')
      .then((mod) => mod.WelcomeModule),
    //canActivate: [notloggedGuard]
  },
  {
    path: 'home', loadChildren: () => import('./pages/welcome/welcome.module')
      .then((mod) => mod.WelcomeModule),
    //canActivate: [notloggedGuard]
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module')
      .then((mod) => mod.LoginModule),
    canActivate: [notloggedGuard]
  },
  {
    path: 'register-paciente', loadChildren: () => import('./pages/register-paciente/register-paciente.module')
      .then((mod) => mod.RegisterPacienteModule),
    canActivate: [notloggedGuard]
  },
  {
    path: 'register-especialista', loadChildren: () => import('./pages/register-especialista/register-especialista.module')
      .then((mod) => mod.RegisterEspecialistaModule),
    canActivate: [notloggedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
