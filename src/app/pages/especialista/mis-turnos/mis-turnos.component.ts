import { Component } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { Turno } from 'src/app/interfaces/turno.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
})
export class MisTurnosComponent {

  public email!: string;
  public turnos: Turno[] = [];
  public turnosMostrar: Turno[] = [];
  public pacientes: Paciente[] = [];
  public mostrarHistorial: boolean = false;

  constructor(private auth: AuthService, private tur: TurnoService, private pac: PacientesService, private cUser: CurrentUserService) { }

  ngOnInit(): void {
    this.pac.traer().subscribe(data => this.pacientes = data);
    this.traerTurnos();
  }

  traerTurnos() {
    this.auth.getUserLogged()
      .subscribe(user => {
        if (user) {
          this.email = user!.email!;
          this.tur.traerTurnosByEmailEspecialista(this.email)
            .subscribe(turnos => {
              this.turnos = turnos;
              this.turnosMostrar = turnos;
              console.log(this.turnos);

            });
        }
      });
  }
  getPaciente(email: string): string {
    let nombre = '';
    for (const pac of this.pacientes) {
      if (pac.email === email) {
        nombre = `${pac.nombre} ${pac.apellido}`;
        break;
      }
    }
    return nombre;

  }


  async test() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });
    if (text) {
      Swal.fire(text);
    } else {

    }
    console.log("text:", text);
  }


  async cancelar(turno: Turno) {
    Swal.fire({
      title: "Cancelar Turno?",
      text: "No podras revertirlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#339933",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancelar Turno"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Cancelar el Turno",
          inputPlaceholder: "Ingrese la razon por la cual quiere cancelar el turno",
          inputAttributes: {
            "aria-label": "Type your message here"
          },
          showCancelButton: true
        });
        if (text) {
          Swal.fire({
            title: "Cancelado!",
            text: `El turno fue cancelado con exito`,
            icon: "error"
          }).then(() => {
            turno.reseña = text;
            turno.estado = "cancelado";
            this.tur.updateTurno(turno);
            this.traerTurnos();
          });
        }

      }
    });
  }

  async rechazar(turno: Turno) {
    Swal.fire({
      title: "Rechazar Turno?",
      text: "No podras revertirlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#339933",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rechazar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Rechazar el Turno",
          inputPlaceholder: "Ingrese la razon por la cual quiere rechazar el turno",
          inputAttributes: {
            "aria-label": "Type your message here"
          },
          showCancelButton: true
        });
        if (text) {
          Swal.fire({
            title: "Rechazado!",
            text: `El turno fue rechazado con exito`,
            icon: "error"
          }).then(() => {
            turno.reseña = text;
            turno.estado = "rechazado";
            this.tur.updateTurno(turno);
            this.traerTurnos();
          });
        }

      }
    });
  }

  aceptar(turno: Turno): void {
    Swal.fire({
      title: "Aceptar Turno?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#339933",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Aceptado!",
          text: `El paciente lo visitada ${turno.fecha} a las ${turno.horario.hora} en el consultorio ${turno.horario.nroConsultorio}.`,
          icon: "success"
        }).then(() => {
          turno.estado = "aceptado";
          this.tur.updateTurno(turno);
          this.traerTurnos();
        });
      }
    });
  }

  verCalificacion(turno: Turno) {
    Swal.fire(turno.calificacion);
  }

  async finalizar(turno: Turno) {
    Swal.fire({
      title: "Finalizar Turno?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#339933",
      cancelButtonColor: "#d33",
      confirmButtonText: "Finalizar Turno"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: text } = await Swal.fire({
          input: "textarea",
          inputLabel: "Finalizacion de Turno",
          inputPlaceholder: "Deje una reseña o comentario de la consulta y diagnóstico realizado...",
          inputAttributes: {
            "aria-label": "Type your message here"
          },
          showCancelButton: true
        });
        if (text) {
          Swal.fire({
            title: "Finalizado!",
            text: `El paciente recibira su diagnóstico.`,
            icon: "success"
          }).then(() => {
            turno.reseña = text;
            turno.estado = "finalizado";
            this.tur.updateTurno(turno);
            this.traerTurnos();
          });
        }
      }
    });
  }

  async cargarHistorial(turno: Turno) {
    this.mostrarHistorial = true;
    this.cUser.idPacienteHistorial = this.getIdPaciente(turno.pacienteEmail);
    this.cUser.turno = turno;

  }

  getIdPaciente(pacienteEmail: string): string {
    for (const pac of this.pacientes) {
      if (pac.email === pacienteEmail) {
        return pac.idDoc;
      }
    }
    return '';
  }

  getHistorial(historial: boolean) {
    this.mostrarHistorial = historial;
    this.traerTurnos();
  }

  contieneSubcadenaIgnoreCase(cadenaPrincipal: string, subcadena: string): boolean {
    return cadenaPrincipal.toLowerCase().includes(subcadena.toLowerCase());
  }

  getFiltro(event: any) {
    const valor = event.target.value;

    if (valor === '') {
      this.turnosMostrar = this.turnos;
    } else {
      this.turnosMostrar = [];
      for (const turno of this.turnos) {
        if (this.contieneSubcadenaIgnoreCase(turno.estado, valor) ||
          this.contieneSubcadenaIgnoreCase(turno.fecha, valor) ||
          this.contieneSubcadenaIgnoreCase(turno.especialidad, valor) ||
          this.contieneSubcadenaIgnoreCase(turno.horario.hora, valor) ||
          this.contieneSubcadenaIgnoreCase(this.getPaciente(turno.pacienteEmail), valor)) {
          this.turnosMostrar.push(turno);
        }
      }
    }
  }

}
