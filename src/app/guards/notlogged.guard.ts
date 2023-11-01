import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const notloggedGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const user = inject(UsuarioService);

  return new Observable<boolean>(observer => {
    auth.getUserLogged().subscribe(res => {
      if (!res) {
        observer.next(true);
        observer.complete();
      } else {
        user.esAdmin(res.email!).subscribe((ans) => {
          if (ans) {
            observer.next(false);
            observer.complete();
          } else {
            if (res.emailVerified) {
              user.esEspecialista(res.email!).subscribe((ans) => {
                if (ans) {
                  observer.next(!ans.active);
                  observer.complete();
                } else {
                  observer.next(true);
                  observer.complete();
                }
              });
            } else {
              observer.next(true);
              observer.complete();
            }
          }
        });
      }
    });
  });
};
