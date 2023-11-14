import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Turno } from 'src/app/interfaces/turno.inteface';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  public turnos: Turno[] = [];
  public turnosDisponibles: Turno[] | null = null;
  public filtroSelect: string = "";
  public especialidadSelect: string = "";
  public especialistaSelect: Especialista | null = null;
  public especialistas: Especialista[] = [];
  public especialidades: Especialidad[] = [];

  constructor(private tur: TurnoService, private spinner: NgxSpinnerService, private esp: EspecialistaService, private especial: EspecialidadService) { }

  ngOnInit(): void {
    this.tur.traerTurnos().subscribe(turnos => this.turnos = turnos);
    this.esp.traer().subscribe(data => this.especialistas = data);
    this.especial.traer().subscribe(data => this.especialidades = data);
  }

  reset() {
    this.filtroSelect = "";
    this.especialistaSelect = null;
    this.especialidadSelect = "";
    this.turnosDisponibles = null;
  }

  setFiltro(selector: string): void {
    this.spinner.show();
    setTimeout(() => {
      this.filtroSelect = selector;
      if (this.filtroSelect == "todos") {
        this.turnosDisponibles = this.turnos
      } else {
        this.turnosDisponibles = [];
      }
      this.spinner.hide();
    }, 1000);
  }

  setEspecialista(esp: Especialista): void {
    this.spinner.show();
    setTimeout(() => {
      this.especialistaSelect = esp;
      console.log(this.especialistaSelect);
      for (const turno of this.turnos) {
        if (turno.especialistaEmail === esp.email) {
          this.turnosDisponibles?.push(turno);
        }
      }
      this.spinner.hide();
    }, 1000);

  }

  setEspecialidad(esp: string): void {
    this.spinner.show();

    setTimeout(() => {
      this.especialidadSelect = esp;
      //console.log(this.especialidadSelect);
      for (const turno of this.turnos) {
        //console.log(this.getData(turno.especialistaEmail)?.especialidad);

        if (this.getData(turno.especialistaEmail)?.especialidad.includes(esp)) {
          this.turnosDisponibles?.push(turno);
        }
      }
      this.spinner.hide();
    }, 1000);

  }

  getEspecialista(email: string): string {

    let nombre = '';
    for (const esp of this.especialistas) {
      if (esp.email === email) {
        nombre = `${esp.nombre} ${esp.apellido}`;
        break;
      }
    }
    return nombre;
  }

  getData(email: string): Especialista | null {
    for (const esp of this.especialistas) {
      if (esp.email === email) {
        return esp;
      }
    }
    return null
  }


  cancelar(turno: Turno): void {

  }
}
