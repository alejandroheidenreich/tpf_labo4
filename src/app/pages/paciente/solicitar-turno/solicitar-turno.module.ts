import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule,
    CalendarModule,
    FormsModule
  ]
})
export class SolicitarTurnoModule { }
