import { Hora, Horario } from "./jornada.interface";


export interface Turno {
    horario: Horario,
    fecha: Date,
    pacienteEmail: string,
    especialistaEmail: string,
    especialidad: string,
    estado: string,
}

export interface DiaAtencion {
    fecha: Date,
    dia: string,
    horarios: HorarioAtencion[];

}

export interface HorarioAtencion {
    hora: Hora;
    nroConsultorio: number;
    disponible: boolean;
}