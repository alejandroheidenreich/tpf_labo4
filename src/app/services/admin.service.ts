import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Admin } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dataRef = collection(this.firestore, 'admins');

  constructor(private firestore: Firestore) { }

  agregarAdmin(nuevoAdmin: Admin): Promise<any> {
    if (nuevoAdmin === null) return Promise.reject();
    const docs = doc(this.dataRef);
    nuevoAdmin.idDoc = docs.id;
    return setDoc(docs, nuevoAdmin);
  }

  traer(): Observable<Admin[]> {
    return new Observable<Admin[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const admins: Admin[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Admin;
          admins.push(one);
        });
        observer.next(admins);
      });
    });
  }

  obtenerAdmin(listaAdmins: Admin[]) {
    const q = query(this.dataRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          listaAdmins.push(
            change.doc.data() as Admin);
        }
      });
    });
    return unsubscribe;
  }
}
