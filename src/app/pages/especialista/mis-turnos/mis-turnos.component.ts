import { Component } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { Turno } from 'src/app/interfaces/turno.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TurnoService } from 'src/app/services/turno.service';

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

  cancelar(turno: Turno): void {
  }

  rechazar(turno: Turno): void {

  }

  aceptar(turno: Turno): void {

  }

  finalizar(turno: Turno): void {

  }
}
