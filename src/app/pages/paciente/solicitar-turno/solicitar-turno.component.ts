import { Component, OnInit } from '@angular/core';
import { Horario, Jornada } from 'src/app/interfaces/jornada.interface';
import { JornadaService } from 'src/app/services/jornada.service';


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  public minDate!: Date;
  public maxDate!: Date;
  public date!: Date;
  public jornadas!: Jornada[];
  public horarios: Horario[] = [];

  constructor(public jor: JornadaService) { }

  ngOnInit(): void {
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(this.minDate);
    this.maxDate.setDate(this.minDate.getDate() + 14);
    this.date = this.minDate;
    this.jor.traerJornadas().subscribe(res => {
      this.jornadas = res
      this.cargarTurnos();
    });
  }

  test() {
    //console.log(this.date);
    this.cargarTurnos();
  }

  cargarTurnos() {

    if (this.date != null) {
      this.horarios = [];
      const dia = this.convertirDiaATexto(this.date.getDay());

      for (const jornada of this.jornadas) {
        if (jornada.dias[dia].length > 0) {
          this.horarios = this.horarios.concat(jornada.dias[dia]);
        }
      }
    }

  }

  convertirDiaATexto(dia: number): string {
    const semana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

    return semana[dia];
  }


}
