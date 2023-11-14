import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Turno } from 'src/app/interfaces/turno.inteface';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  public email!: string;
  public turnos: Turno[] = [];
  public especialistas: Especialista[] = [];


  constructor(private auth: AuthService, private tur: TurnoService, private esp: EspecialistaService) { }

  ngOnInit(): void {
    this.auth.getUserLogged()
      .subscribe(user => {
        if (user) {
          this.email = user!.email!;
          this.tur.traerTurnosByEmailPaciente(this.email)
            .subscribe(turnos => {
              this.turnos = turnos;
              for (const item of this.turnos) {
                this.esp.traerPorEmail(item.especialistaEmail).subscribe(res => {
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
              console.log(this.especialistas);

            });
        }
      });


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
