import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialistaRoutingModule } from './especialista-routing.module';
import { EspecialistaComponent } from './especialista.component';
import { NavbarModule } from 'src/app/modules/navbar/navbar.module';


@NgModule({
  declarations: [
    EspecialistaComponent
  ],
  imports: [
    CommonModule,
    EspecialistaRoutingModule,
    NavbarModule
  ]
})
export class EspecialistaModule { }
