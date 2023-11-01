import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { Especialista } from '../interfaces/especialista.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  private dataRef = collection(this.firestore, 'especialistas');

  constructor(private firestore: Firestore) { }

  agregarEspecialista(nuevoEspecialista: Especialista): Promise<any> {
    if (nuevoEspecialista === null) return Promise.reject();
    const docs = doc(this.dataRef);
    nuevoEspecialista.idDoc = docs.id;
    return setDoc(docs, nuevoEspecialista);
  }

  updateEspecialista(especialista: Especialista): void {
    if (especialista === null) return;
    const docs = doc(this.dataRef, especialista.idDoc);
    updateDoc(docs, { active: especialista.active });
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
    const q = query(this.dataRef);
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
