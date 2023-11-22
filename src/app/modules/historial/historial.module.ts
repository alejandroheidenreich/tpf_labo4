import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComponent } from './historial.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HistorialComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [HistorialComponent]
})
export class HistorialModule { }
