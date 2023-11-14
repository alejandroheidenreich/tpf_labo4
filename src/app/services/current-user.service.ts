import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { Especialista } from '../interfaces/especialista.interface';
import { Paciente } from '../interfaces/paciente.interface';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public especialista!: Especialista;
  public paciente!: Paciente;
  public admin!: Admin;
  public accionHorarios!: string;

  public currentUser: Usuario = {
    email: '',
    clave: ''
  }

  constructor() { }


}
