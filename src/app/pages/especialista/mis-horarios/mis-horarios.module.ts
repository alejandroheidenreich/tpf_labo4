import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisHorariosRoutingModule } from './mis-horarios-routing.module';
import { MisHorariosComponent } from './mis-horarios.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MisHorariosComponent
  ],
  imports: [
    CommonModule,
    MisHorariosRoutingModule,
    FormsModule
  ]
})
export class MisHorariosModule { }
