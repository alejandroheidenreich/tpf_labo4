import { Injectable } from '@angular/core';
import { EspecialistaService } from './especialista.service';
import { Especialista } from '../interfaces/especialista.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateEspecialistaService {



  constructor(private especialistaService: EspecialistaService) { }

  traerPorEmail(email: string): Observable<Especialista | undefined> {

    return new Observable<Especialista | undefined>(obs => {
      this.especialistaService.traer()
        .subscribe(lista => {

          obs.next(lista.find(e => e.email === email));
          obs.complete();
        });

    })


  }
}
