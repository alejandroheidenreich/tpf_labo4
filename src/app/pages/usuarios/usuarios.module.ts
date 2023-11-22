import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { EspecialistasComponent } from './especialistas/especialistas.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AdminsComponent } from './admins/admins.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnosComponent } from './turnos/turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { AltaEspecialidadComponent } from './alta-especialidad/alta-especialidad.component';
import { PipeModule } from 'src/pipe/pipe.module';





@NgModule({
  declarations: [
    UsuariosComponent, SidebarComponent, EspecialistasComponent, PacientesComponent, AdminsComponent, TurnosComponent, SolicitarTurnoComponent, AltaEspecialidadComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    PipeModule

  ]
})
export class UsuariosModule { }
