import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
import { Especialista } from '../interfaces/especialista.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  private dataRef = collection(this.firestore, 'especialistas');

  constructor(private firestore: Firestore) { }

  agregarEspecialista(nuevoEspecialista: Especialista): void {
    if (nuevoEspecialista === null) return;
    const col = collection(this.firestore, 'especialistas');
    addDoc(col, nuevoEspecialista);
  }

  traer(): Observable<Especialista[]> {
    return new Observable<Especialista[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const especialistas: Especialista[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Especialista;
          especialistas.push(one);
        });
        observer.next(especialistas);
      });
    });
  }

  obtenerEspecialista(listaEspecialistas: Especialista[]) {
    const q = query(collection(this.firestore, 'especialistas'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          listaEspecialistas.push(
            change.doc.data() as Especialista);
        }
      });
    });
    return unsubscribe;
  }

}
