import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { Paciente } from '../interfaces/paciente.interface';
import { Observable } from 'rxjs';
import { ImagenService } from './imagen.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private dataRef = collection(this.firestore, 'pacientes');

  constructor(private firestore: Firestore, private imgService: ImagenService) { }

  agregarPaciente(nuevoPaciente: Paciente): Promise<any> {
    if (nuevoPaciente === null) return Promise.reject();
    ;
    const docs = doc(this.dataRef);
    nuevoPaciente.idDoc = docs.id;
    return setDoc(docs, nuevoPaciente);
    //return addDoc(col, nuevoPaciente);
  }


  obtenerPacientes(listaPacientes: Paciente[]) {
    const q = query(collection(this.firestore, 'pacientes'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          listaPacientes.push(
            change.doc.data() as Paciente);
        }
      });
    });
    return unsubscribe;
  }

  traer(): Observable<Paciente[]> {
    return new Observable<Paciente[]>((observer) => {
      onSnapshot(collection(this.firestore, 'pacientes'), (snap) => {
        const especialistas: Paciente[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Paciente;
          especialistas.push(one);
        });
        observer.next(especialistas);
      });
    });
  }

  traerPorEmail(email: string): Observable<Paciente> {
    return new Observable<Paciente>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as Paciente;
          if (data.email === email) {
            observer.next(data);
          }
        });
      });
    });
  }
}
