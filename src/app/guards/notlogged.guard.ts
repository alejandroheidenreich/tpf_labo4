import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const notloggedGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router)
  const auth = inject(AuthService)

  return new Observable<boolean>(observer => {
    auth.getUserLogged().subscribe(res => {
      if (!res) {
        observer.next(true);
        observer.complete();
      } else {
        router.navigate(['']);
        observer.next(false);
        observer.complete();
      }
    });
  });
};
