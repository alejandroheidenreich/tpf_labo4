import { Dias, Hora, Horario } from "./jornada.interface";


export interface Turno {
    horario: Horario,
    fecha: string,
    pacienteEmail: string,
    especialistaEmail: string,
    especialidad: string,
    estado: string,
    id: string,
    reseña: string,
    calificacion: string,
    encuesta: string[],
}

export interface DiaAtencion {
    fecha: string,
    dia: string,
    horarios: HorarioAtencion[];
}

export interface HorarioAtencion {
    horario: Horario;
    especialistaEmail: string,
    disponible: boolean,

}

