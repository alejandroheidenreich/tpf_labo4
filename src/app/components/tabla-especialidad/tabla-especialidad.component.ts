import { Component, EventEmitter, Output } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-tabla-especialidad',
  templateUrl: './tabla-especialidad.component.html',
  styleUrls: ['./tabla-especialidad.component.css']
})
export class TablaEspecialidadComponent {
  @Output() public especial = new EventEmitter<string>();

  public rowClicked!: number;
  public especialidades: Especialidad[] = [];
  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  getEspecialidades(): void {
    this.especialidadService.obtenerEspecialidades(this.especialidades);
  }

  onClickRow(obra: any, idx: number) {
    if (this.rowClicked === idx) {
      this.rowClicked = -1;
      this.especial.emit('');
    }
    else {
      this.especial.emit(obra);
      this.rowClicked = idx;
    }
    console.log("rowClicked: " + this.rowClicked);
  }

  agregarEspecialidad() {

  }
}
