import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { CalendarModule } from 'src/app/modules/calendar/calendar.module';


@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule
  ]
})
export class MisTurnosModule { }
