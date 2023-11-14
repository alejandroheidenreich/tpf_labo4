import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Turno } from 'src/app/interfaces/turno.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css'],
})
export class MisTurnosComponent implements OnInit {
  public email!: string;
  public turnos: Turno[] = [];
  public especialistas: Especialista[] = [];

  constructor(
    private auth: AuthService,
    private tur: TurnoService,
    private esp: EspecialistaService
  ) {}

  ngOnInit(): void {
    this.auth.getUserLogged().subscribe((user) => {
      if (user) {
        this.email = user!.email!;
        this.traerTurnos();
      }
    });
  }

  traerTurnos() {
    this.tur.traerTurnosByEmailPaciente(this.email).subscribe((turnos) => {
      this.turnos = turnos;
      for (const item of this.turnos) {
        this.esp.traerPorEmail(item.especialistaEmail).subscribe((res) => {
          let existe = false;
          if (this.especialistas.length == 0) {
            this.especialistas.push(res);
          } else {
            for (const especialista of this.especialistas) {
              if (especialista.email === res.email) {
                existe = true;
                break;
              }
            }
            if (!existe) {
              this.especialistas.push(res);
            }
          }
        });
      }
    });
  }
  verResenia(turno: Turno) {
    if (turno.reseña) {
      Swal.fire(turno.reseña);
    } else {
      Swal.fire('No hay reseña todavia');
    }
  }

  getResenia(turno: Turno): string {
    return turno.reseña;
  }

  async calificar(turno: Turno) {
    const { value: calificacion } = await Swal.fire({
      title: 'Califique la atencion',
      input: 'select',
      inputOptions: {
        'Excelente': 'Excelente',
        'Muy Bueno': 'Muy Bueno',
        'Bueno': 'Bueno',
        'Malo': 'Malo',
      },
      inputPlaceholder: 'Puntaje',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('Debes seleccionar una opcion');
          } else {
            resolve();
          }
        });
      },
    });
    if (calificacion) {
      turno.calificacion = calificacion;
      this.tur.updateTurno(turno);
      this.traerTurnos();
    }
  }

  async cancelar(turno: Turno) {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Razon de cancelacion',
      inputPlaceholder: 'Ingrese la razon por la cual quiere cancelar el turno',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    });
    if (text) {
      turno.reseña = text;
      turno.estado = 'rechazado';
      this.tur.updateTurno(turno);
      this.traerTurnos();
    }
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
}
