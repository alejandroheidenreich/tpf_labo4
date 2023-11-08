import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

export const checkAdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const rolCheck = inject(AdminService)
  const userService = inject(UsuarioService)

  return new Observable<boolean>(observer => {
    auth.getUserLogged().subscribe(res => {
      if (res) {
        userService.esAdmin(res.email!).subscribe((ans) => {
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
