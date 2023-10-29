import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
import { ObraSocial } from '../interfaces/obraSocial.interface';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  constructor(private firestore: Firestore) { }

  agregarObra(nuevaObra: ObraSocial): void {
    if (nuevaObra === null) return;
    const col = collection(this.firestore, 'obrasociales');
    addDoc(col, { nuevaObra });
  }

  obtenerObras(listaObras: ObraSocial[]) {
    const q = query(collection(this.firestore, 'obrasociales'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          listaObras.push(
            change.doc.data() as ObraSocial);
        }
      });
    });
    return unsubscribe;
  }
}
