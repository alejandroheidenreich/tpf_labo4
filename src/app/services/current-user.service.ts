import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public currentUser: Usuario = {
    email: '',
    clave: ''
  }

  constructor() { }


}
