import { Component, OnInit } from '@angular/core';
import { DatoDinamico, HistoriaClinica } from 'src/app/interfaces/historiaclinica.interface';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public historialClinico: HistoriaClinica[] = [];
  public especialistaEmail!: string;
  public pacientes: Paciente[] = [];
  public todosHistorialClinicos: HistoriaClinica[] = [];

  constructor(private pac: PacientesService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserLogged().subscribe(user => {
      this.especialistaEmail = user?.email!
      this.pac.traer().subscribe(pacientes => {
        for (const paciente of pacientes) {
          this.pac.traerHistorialClinicoPorId(paciente.idDoc)
            .subscribe(hisotriales => {
              for (const his of hisotriales) {
                if (his.especialsitaEmail === this.especialistaEmail) {
                  this.todosHistorialClinicos.push(his);
                  if (!this.pacientes.includes(paciente))
                    this.pacientes.push(paciente);
                }
              }
            });
        }
      });
    });
  }

  getPaciente(email: string): string {
    for (const pac of this.pacientes) {
      if (pac.email === email) {
        return `${pac.nombre} ${pac.apellido}`
      }
    }
    return '';
  }

  sacarKey(datos: DatoDinamico) {
    return Object.keys(datos)[0]
  }

  getHistorial(paciente: Paciente) {
    for (const his of this.todosHistorialClinicos) {
      if (his.pacienteEmail === paciente.email) {
        this.historialClinico.push(his);
      }
    }
  }

  reset() {
    this.historialClinico = [];
  }
}
