import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AdminsComponent } from './admins/admins.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPacienteComponent } from '../register-paciente/register-paciente.component';


@NgModule({
  declarations: [
    UsuariosComponent, SidebarComponent, EspecialistasComponent, PacientesComponent, AdminsComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
