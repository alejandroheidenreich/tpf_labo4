import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css']
})
export class EspecialistasComponent implements OnInit {

  public especialistas!: Especialista[];
  public especialidades!: Especialidad[];

  constructor(private espService: EspecialistaService, private esp: EspecialidadService) { }

  ngOnInit(): void {
    this.espService.traer().subscribe(data => this.especialistas = data);
    this.esp.traer().subscribe(data => this.especialidades = data);
  }

  toggleActive(esp: Especialista) {
    console.log(esp);

    esp.active = !esp.active;
    for (const especialidad of esp.especialidad) {
      if (!this.containsNewEspecialidad(especialidad)) {
        this.esp.agregarEspecialidad({ nombre: especialidad, img: '' });
      }
    }
    this.espService.updateEspecialista(esp);
    this.espService.traer().subscribe(data => this.especialistas = data);
  }

  containsNewEspecialidad(esp: string) {
    for (const especialidad of this.especialidades) {
      if (esp === especialidad.nombre) {
        return true;
      }
    }
    return false;
  }
}
