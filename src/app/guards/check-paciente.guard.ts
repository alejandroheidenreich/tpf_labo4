import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const checkPacienteGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const userService = inject(UsuarioService)

  return new Observable<boolean>(observer => {
    auth.getUserLogged().subscribe(res => {
      if (res) {
        userService.esPaciente(res.email!).subscribe((ans) => {
          if (ans) {
            observer.next(true);
            observer.complete();
          } else {
            observer.next(false);
            observer.complete();
          }
        });
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  });
};
