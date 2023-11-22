import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoraFormatPipe } from './format-time.pipe';



@NgModule({
  declarations: [
    HoraFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [HoraFormatPipe]
})
export class PipeModule { }
