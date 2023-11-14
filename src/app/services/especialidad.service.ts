import { Injectable } from '@angular/core';
import { Especialidad } from '../interfaces/especialidad.interface';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private dataRef = collection(this.firestore, 'especialidades');

  constructor(private firestore: Firestore) { }

  agregarEspecialidad(nuevaEspecialidad: Especialidad): void {
    if (nuevaEspecialidad === null) return;
    addDoc(this.dataRef, nuevaEspecialidad);
  }

  obtenerEspecialidades(listaEspecialidades: Especialidad[]) {
    const q = query(this.dataRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          listaEspecialidades.push(
            change.doc.data() as Especialidad);
        }
      });
    });
    return unsubscribe;
  }

  traer(): Observable<Especialidad[]> {
    return new Observable<Especialidad[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const especialidades: Especialidad[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Especialidad;
          especialidades.push(one);
        });
        observer.next(especialidades);
      });
    });
  }
}
