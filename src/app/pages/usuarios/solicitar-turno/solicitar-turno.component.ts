import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Horario, Jornada } from 'src/app/interfaces/jornada.interface';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { HorarioAtencion, Turno } from 'src/app/interfaces/turno.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { JornadaService } from 'src/app/services/jornada.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {
  public jornadas!: Jornada[];
  public fechas!: any;
  public turnosDisponibles: any[] | null = null;
  public turno!: Turno;
  public horarios: Horario[] = [];
  public pacienteEmail!: string;
  public pacientes: Paciente[] = [];
  public pacienteSelect!: Paciente;
  public turnosActuales!: Turno[];
  public especialistas: Especialista[] = [];
  public especialidades: Especialidad[] = [];
  public filtroSelect: string = "";
  public especialidadSelect: string = "";
  public especialistaSelect: Especialista | null = null;


  constructor(private spinner: NgxSpinnerService, private jor: JornadaService, private tur: TurnoService, private auth: AuthService, private esp: EspecialistaService, private especial: EspecialidadService, private pac: PacientesService) { }

  ngOnInit(): void {
    this.pac.traer().subscribe(data => this.pacientes = data)
    this.esp.traer().subscribe(data => this.especialistas = data);
    this.especial.traer().subscribe(data => this.especialidades = data);
    this.jor.traerJornadas().subscribe(res => {
      this.jornadas = res
      this.tur.traerTurnos().subscribe(data => {
        this.turnosActuales = data
      });
    });
  }


  test(algo: any) {
    console.log("ALGO: ", algo);
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
  cargarTurnos(): void {
    this.horarios = [];
    this.turnosDisponibles = [];
    let cargo = false;
    let fecha = new Date(Date.now());
    fecha.setDate(fecha.getDate() + 1);

    for (let index = 0; index < 15; index++) {
      let unDia: HorarioAtencion[] = [];
      if (index != 0)
        fecha.setDate(fecha.getDate() + 1);

      const dia = this.convertirDiaATexto(fecha.getDay());
      for (const jornada of this.jornadas) {
        if ((this.filtroSelect === 'especialista' && jornada.email === this.especialistaSelect?.email) ||
          (this.filtroSelect === 'especialidad' && this.contieneEspecialidad(jornada, this.especialidadSelect))) {

          if (dia !== 'domingo' && jornada.dias[dia].length > 0) {
            for (const horarioJor of jornada.dias[dia]) {
              const disp = this.existeHorarioEnTurnos(horarioJor, fecha.toLocaleDateString());
              const horarioAtencion: HorarioAtencion = {
                horario: horarioJor,
                especialistaEmail: jornada.email,
                disponible: disp
              };
              unDia.push(horarioAtencion);
            }
          }
        }

      }
      this.fechas = {
        [`${fecha.toLocaleDateString()}`]: unDia,
        dia: dia
      };
      this.turnosDisponibles.push(this.fechas);
    }
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
      this.spinner.hide();
    }, 1000);
  }

  setEspecialista(esp: Especialista): void {
    this.spinner.show();
    setTimeout(() => {
      this.especialistaSelect = esp;
      console.log(this.especialistaSelect);
      this.cargarTurnos();
      this.spinner.hide();
    }, 1000);

  }

  setPaciente(pac: Paciente): void {
    this.spinner.show();
    setTimeout(() => {
      this.pacienteSelect = pac;
      console.log(this.pacienteSelect);
      this.spinner.hide();
    }, 1000);

  }

  setEspecialidad(esp: string): void {
    this.spinner.show();

    setTimeout(() => {
      this.especialidadSelect = esp;
      console.log(this.especialidadSelect);

      this.cargarTurnos();
      this.spinner.hide();
    }, 1000);

  }



  contieneEspecialidad(jornada: Jornada, esp: string): boolean {
    for (const especialista of this.especialistas) {
      if (especialista.email === jornada.email) {
        if (especialista.especialidad.includes(esp)) {
          return true;
        }
        break;
      }
    }
    return false;

  }
  existeHorarioEnTurnos(horario: Horario, fecha: string): boolean {
    for (const turno of this.turnosActuales) {
      if (turno.horario.hora === horario.hora && turno.horario.nroConsultorio === horario.nroConsultorio && fecha === turno.fecha) {
        return false;
      }
    }
    return true;
  }

  generarTurno(fecha: string, turno: HorarioAtencion): void {

    let esp = this.especialidadSelect;

    if (this.especialidadSelect === "") {
      esp = this.especialistaSelect?.especialidad[0]!;
    }

    this.turno = {
      horario: turno.horario,
      fecha: fecha,
      pacienteEmail: this.pacienteSelect.email,
      especialistaEmail: turno.especialistaEmail,
      especialidad: esp,
      estado: 'pendiente',
      id: '',
      reseña: '',
      calificacion: '',
    }

    this.tur.agregarTurno(this.turno);
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      title: 'Turno generado',
      footer: "Recuerde presentarse con el carnet de obra social",
      showConfirmButton: false,
      timer: 1500
    }).then(() => this.reset());
    ;
  }

  convertirDiaATexto(dia: number): string {
    const semana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return semana[dia];
  }

  getKeyByIndex(array: any[], index: number): string {
    return Object.keys(array[index])[0];
  }

  getElementArray(array: any[], index: number): any[] {
    return array[index][this.getKeyByIndex(array, index)];
  }

  checkEmptyArray(array: any[]): boolean {
    for (let i = 0; i < array.length; i++) {
      if (this.getElementArray(array, i).length > 0) {
        return false;
      }
    }
    return true;
  }



}
