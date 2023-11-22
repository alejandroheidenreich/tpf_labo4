import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, query, setDoc } from '@angular/fire/firestore';
import { Paciente } from '../interfaces/paciente.interface';
import { Observable } from 'rxjs';
import { ImagenService } from './imagen.service';
import { HistoriaClinica } from '../interfaces/historiaclinica.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private dataRef = collection(this.firestore, 'pacientes');

  constructor(private firestore: Firestore, private imgService: ImagenService) { }

  agregarPaciente(nuevoPaciente: Paciente): Promise<any> {
    if (nuevoPaciente === null) return Promise.reject();
    const docs = doc(this.dataRef);
    nuevoPaciente.idDoc = docs.id;
    return setDoc(docs, nuevoPaciente);
  }

  agregarHistorialPaciente(nuevoHistorial: any, paciente: Paciente): Promise<any> {
    if (paciente === null) return Promise.reject();
    const col = collection(this.firestore, 'pacientes/' + paciente.idDoc + '/historial')
    return addDoc(col, nuevoHistorial);
  }

  agregarHistorialPacienteId(nuevoHistorial: any, idPac: string): Promise<any> {
    if (idPac === '') return Promise.reject();
    const col = collection(this.firestore, 'pacientes/' + idPac + '/historial')
    return addDoc(col, nuevoHistorial);
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
        const pacientes: Paciente[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Paciente;
          pacientes.push(one);
        });
        observer.next(pacientes);
      });
    });
  }

  traerPacientePorId(idPac: string): Observable<Paciente> {
    return new Observable<Paciente>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as Paciente;
          if (data.idDoc === idPac) {
            observer.next(data);
          }
        });
      });
    });
  }



  traerHistorialClinicoPorId(pacId: string): Observable<HistoriaClinica[]> {
    return new Observable<HistoriaClinica[]>((observer) => {
      const col = collection(this.firestore, 'pacientes/' + pacId + '/historial')
      onSnapshot(col, (snap) => {
        const hist: HistoriaClinica[] = [];
        snap.docChanges().forEach(x => {
          const data = x.doc.data() as HistoriaClinica;
          hist.push(data);
        });
        observer.next(hist);
      });
    });
  }

  traerHistorialClinico(): Observable<HistoriaClinica[]> {
    return new Observable<HistoriaClinica[]>((observer) => {
      onSnapshot(collection(this.firestore, 'pacientes'), (snap) => {
        const pacientes: Paciente[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Paciente;
          pacientes.push(one);
        });
        const historiales: HistoriaClinica[] = [];
        pacientes.forEach(pac => {
          onSnapshot(collection(this.firestore, 'pacientes/' + pac.idDoc + '/historial'), (snap) => {
            snap.docChanges().forEach(x => {
              const one = x.doc.data() as HistoriaClinica;
              historiales.push(one);
            });

          });
        });
        observer.next(historiales);
      });
    })
  }

}
