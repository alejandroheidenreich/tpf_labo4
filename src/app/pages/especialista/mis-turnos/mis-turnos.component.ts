import { Component } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { Turno } from 'src/app/interfaces/turno.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TurnoService } from 'src/app/services/turno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {
  public email!: string;
  public turnos: Turno[] = [];
  public pacientes: Paciente[] = [];

  constructor(private auth: AuthService, private tur: TurnoService, private pac: PacientesService) { }

  ngOnInit(): void {
    this.pac.traer().subscribe(data => this.pacientes = data);
    this.traerTurnos();
  }

  traerTurnos(){
    this.auth.getUserLogged()
      .subscribe(user => {
        if (user) {
          this.email = user!.email!;
          this.tur.traerTurnosByEmailEspecialista(this.email)
            .subscribe(turnos => {
              this.turnos = turnos;
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


  async test(){
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
    }else{
      
    }
    console.log("text:",text);
 
  }
  cancelar(turno: Turno): void {
  }

  async rechazar(turno: Turno) {
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
      turno.reseña = text;
      turno.estado = "rechazado";
      this.tur.updateTurno(turno);
      this.traerTurnos();
    }
    console.log(turno);
    
  }

  aceptar(turno: Turno): void {

    turno.estado = "aceptado";
      this.tur.updateTurno(turno);
      this.traerTurnos();
  }

  verCalificacion(turno: Turno){
    Swal.fire(turno.calificacion);
  }

  finalizar(turno: Turno): void {
    turno.estado = "finalizado";
    this.tur.updateTurno(turno);
    this.traerTurnos();
  }
}
