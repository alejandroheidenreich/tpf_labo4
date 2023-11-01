import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';

export const checkEspecialistaGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const userService = inject(UsuarioService)

  return new Observable<boolean>(observer => {
    auth.getUserLogged().subscribe(res => {
      if (res) {
        userService.esEspecialista(res.email!).subscribe((ans) => {
          if (ans && ans.active) {
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
