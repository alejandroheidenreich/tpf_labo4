import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notloggedGuard } from './guards/notlogged.guard';
import { checkAdminGuard } from './guards/check-admin.guard';
import { checkPacienteGuard } from './guards/check-paciente.guard';
import { checkEspecialistaGuard } from './guards/check-especialista.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./pages/welcome/welcome.module')
      .then((mod) => mod.WelcomeModule),
    canActivate: [notloggedGuard],
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module')
      .then((mod) => mod.LoginModule),
    canActivate: [notloggedGuard],
  },
  {
    path: 'register-paciente', loadChildren: () => import('./pages/register-paciente/register-paciente.module')
      .then((mod) => mod.RegisterPacienteModule),
    canActivate: [notloggedGuard],
  },
  {
    path: 'register-especialista', loadChildren: () => import('./pages/register-especialista/register-especialista.module')
      .then((mod) => mod.RegisterEspecialistaModule),
    canActivate: [notloggedGuard],
  },
  {
    path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module')
      .then((mod) => mod.UsuariosModule),
    canActivate: [checkAdminGuard],
  },
  {
    path: 'paciente', loadChildren: () => import('./pages/paciente/paciente.module')
      .then((mod) => mod.PacienteModule),
    canActivate: [checkPacienteGuard],
  },
  {
    path: 'especialista', loadChildren: () => import('./pages/especialista/especialista.module')
      .then((mod) => mod.EspecialistaModule),
    canActivate: [checkEspecialistaGuard],
  },
  {
    path: '**', loadChildren: () => import('./pages/error/error.module')
      .then((mod) => mod.ErrorModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
