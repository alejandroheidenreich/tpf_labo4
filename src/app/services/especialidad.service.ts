import { Injectable } from '@angular/core';
import { Especialidad } from '../interfaces/especialidad.interface';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private firestore: Firestore) { }

  agregarEspecialidad(nuevaEspecialidad: Especialidad): void {
    if (nuevaEspecialidad === null) return;
    const col = collection(this.firestore, 'especialidades');
    addDoc(col, nuevaEspecialidad);
  }

  obtenerEspecialidades(listaEspecialidades: Especialidad[]) {
    const q = query(collection(this.firestore, 'especialidades'));
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
}
