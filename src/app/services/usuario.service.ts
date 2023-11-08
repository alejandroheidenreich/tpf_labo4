import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { Observable } from 'rxjs';
import { PacientesService } from './pacientes.service';
import { EspecialistaService } from './especialista.service';
import { Especialista } from '../interfaces/especialista.interface';
import { Paciente } from '../interfaces/paciente.interface';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private adminService: AdminService, private pacienteService: PacientesService, private especialsitaService: EspecialistaService) { }

  esAdmin(email: string): Observable<Admin | null> {

    return new Observable<Admin | null>((observer) => {

      this.adminService.traer().subscribe(admins => {
        admins.forEach(admin => {
          if (admin.email === email) {
            observer.next(admin);
            observer.complete();
          }
        });
        observer.next(null);
        observer.complete();
      })
    });
  }

  esPaciente(email: string): Observable<Paciente | null> {

    return new Observable<Paciente | null>((observer) => {

      this.pacienteService.traer().subscribe(pacientes => {
        pacientes.forEach(paciente => {
          if (paciente.email === email) {
            observer.next(paciente);
            observer.complete();
          }
        });
        observer.next(null);
        observer.complete();
      })
    });
  }

  esEspecialista(email: string): Observable<Especialista | null> {

    return new Observable<Especialista | null>((observer) => {

      this.especialsitaService.traer().subscribe(especialsitas => {
        especialsitas.forEach(especialsita => {
          if (especialsita.email === email) {
            observer.next(especialsita);
            observer.complete();
          }
        });
        observer.next(null);
        observer.complete();
      })
    });
  }

}
