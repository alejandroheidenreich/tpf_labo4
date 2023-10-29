import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, query } from '@angular/fire/firestore';
import { Paciente } from '../interfaces/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private firestore: Firestore) { }

  agregarPaciente(nuevoPaciente: Paciente): void {
    if (nuevoPaciente === null) return;
    const col = collection(this.firestore, 'pacientes');
    addDoc(col, nuevoPaciente);
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
}
