import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { DatoDinamico, HistoriaClinica } from 'src/app/interfaces/historiaclinica.interface';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public historialClinico: HistoriaClinica[] = [];
  public pacientes!: Paciente[];

  public especialistas: Especialista[] = [];
  constructor(private pacientesService: PacientesService, private imgService: ImagenService, private esp: EspecialistaService) { }

  ngOnInit(): void {
    this.pacientesService.traer().subscribe(pacientes => this.pacientes = pacientes);
    this.esp.traer().subscribe(esp => this.especialistas = esp);
  }

  sacarKey(datos: DatoDinamico) {
    return Object.keys(datos)[0]
  }

  getEspecialista(email: string): string {

    for (const esp of this.especialistas) {
      if (esp.email === email) {
        return `${esp.nombre} ${esp.apellido}`;
      }
    }
    return '';
  }

  getHistorial(paciente: Paciente) {
    this.pacientesService.traerHistorialClinicoPorId(paciente.idDoc)
      .subscribe(historial => { this.historialClinico = historial; console.log(this.historialClinico); });
  }

  reset() {
    this.historialClinico = [];
  }
}


