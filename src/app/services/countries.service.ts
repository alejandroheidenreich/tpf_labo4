import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpCliente: HttpClient) { }

  obtenerPaises(): Observable<Pais[]> {
    return this.httpCliente.get<Pais[]>(`https://restcountries.com/v3.1/all`);
  }

  obtenerPais(pais: string): Observable<Pais[]> {
    return this.httpCliente.get<Pais[]>(`https://restcountries.com/v3.1/name/${pais}`);
  }
}
