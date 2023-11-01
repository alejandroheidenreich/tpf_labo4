import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-tabla-especialidad',
  templateUrl: './tabla-especialidad.component.html',
  styleUrls: ['./tabla-especialidad.component.css']
})
export class TablaEspecialidadComponent {
  @Output() public especial = new EventEmitter<string>();
  @ViewChild('especialidadInput') especialidadInput!: ElementRef;

  public rowsClicked: number[] = [];
  public especialidades: Especialidad[] = [];
  public error: boolean = false;
  constructor(private especialidadService: EspecialidadService) { }

  ngOnInit(): void {
    this.getEspecialidades();
  }

  getEspecialidades(): void {
    this.especialidadService.obtenerEspecialidades(this.especialidades);
  }

  onClickRow(obra: any, idx: number) {
    if (this.rowsClicked.includes(idx)) {
      this.rowsClicked.splice(this.rowsClicked.indexOf(idx), 1);
    }
    else {
      this.rowsClicked.push(idx);
    }

    this.especial.emit(obra);
    console.log("rowClicked: " + this.rowsClicked);
  }

  agregarEspecialidad() {
    const especialidad = this.especialidadInput.nativeElement.value;
    const nuevaEspecialidad = this.quitarAcentos(especialidad);
    this.error = false;
    const esp = { nombre: nuevaEspecialidad } as Especialidad;


    this.especialidades.forEach((e) => {
      //console.log(e.nombre);
      if (e.nombre.toLowerCase() == esp.nombre.toLowerCase()) {
        this.error = true;
        return;
      }
    })

    if (!this.error) {
      //this.especialidadService.agregarEspecialidad(esp);
      this.especialidades.push(esp);
      this.especialidadInput.nativeElement.value = '';
    }

  }

  quitarAcentos(texto: string): string {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
