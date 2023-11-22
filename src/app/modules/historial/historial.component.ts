import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatoDinamico, HistoriaClinica } from 'src/app/interfaces/historiaclinica.interface';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  @Output() public turnoHistorial = new EventEmitter<boolean>();

  public form: FormGroup = this.fb.group({
    altura: ['', [Validators.required, Validators.min(1), Validators.max(300)],],
    peso: ['', [Validators.required, Validators.min(1), Validators.max(270)],],
    temperatura: ['', [Validators.required, Validators.min(30), Validators.max(50)],],
    presion: ['', [Validators.required, Validators.min(80), Validators.max(130)],],
    datos: this.fb.array([], [Validators.maxLength(3)])
  });

  public idPaciente!: string;
  public espEmail!: string;
  public datoDinamico!: DatoDinamico;
  public historial!: HistoriaClinica;
  public clave: FormControl = new FormControl('', [Validators.required]);
  public valor: FormControl = new FormControl('', [Validators.required]);
  public claves: string[] = [];
  public paciente!: Paciente;

  constructor(private fb: FormBuilder, private pac: PacientesService, private auth: AuthService, private cUser: CurrentUserService, private turn: TurnoService) { }

  ngOnInit(): void {
    this.auth.getUserLogged().subscribe(user => this.espEmail = user?.email!)
    this.idPaciente = this.cUser.idPacienteHistorial;
    this.pac.traerPacientePorId(this.idPaciente).subscribe(paciente => this.paciente = paciente);
  }

  get datos() {
    return this.form.get('datos') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  isValidFieldInArray(array: FormArray, i: number): boolean | null {
    return array.controls[i].errors && array.controls[i].touched
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field] && !this.form.controls[field].errors) return null;

    const errors = this.form.controls[field].errors;

    for (const key of Object.keys(errors!)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido"
        case 'minlength':
          return `Minimo ${errors!['minlength'].requiredLength} caracteristicas.`
        case 'maxlength':
          return `Maximo ${errors!['maxlength'].requiredLength} caracteristicas.`
        case 'max':
          return `Maximo ${errors!['max'].max}`
        case 'min':
          return `Minimo ${errors!['min'].min}`
      }
    }
    return null;
  }

  onDeleteDatos(i: number): void {
    this.datos.removeAt(i);
    this.claves.splice(i, 1);
  }

  onAddDatos(): void {
    if (this.clave.invalid) return;
    if (this.valor.invalid) return;

    this.datoDinamico = {
      [this.clave.value]: this.valor.value,
    }
    this.claves.push(this.clave.value);
    this.datos.push(this.fb.control(this.datoDinamico, [Validators.required]));

    this.clave.reset();
    this.valor.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.historial = {
      altura: this.form.value['altura'],
      peso: this.form.value['peso'],
      temperatura: this.form.value['temperatura'],
      presion: this.form.value['presion'],
      datos: this.form.value['datos'],
      especialsitaEmail: this.espEmail,
      pacienteEmail: this.paciente.email, //
    }

    this.pac.agregarHistorialPacienteId(this.historial, this.idPaciente);
    ((this.form.controls['datos']) as FormArray) = this.fb.array([]);
    this.form.reset();
    this.cUser.turno.historial = true;
    this.turn.updateTurno(this.cUser.turno);
    this.turnoHistorial.emit(false);
  }

  cancel() {
    this.turnoHistorial.emit(false);
  }

}
