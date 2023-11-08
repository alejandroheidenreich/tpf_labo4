import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisHorariosComponent } from './mis-horarios.component';

const routes: Routes = [
  {
    path: '', component: MisHorariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisHorariosRoutingModule { }
