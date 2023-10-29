import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.css']
})
export class RegisterEspecialistaComponent {

  private especialista: Especialista | undefined;
  private user!: Usuario;

  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    especialidad: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    img: [''],
    terminos: [false, [Validators.requiredTrue]],
  });

  constructor(private fb: FormBuilder, private especialistaService: EspecialistaService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form.reset();
  }

  isValidField(field: string): boolean | null {
    return this.form.controls[field].errors && this.form.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.form.controls[field] && !this.form.controls[field].errors) return null;

    const errors = this.form.controls[field].errors;
    for (const key of Object.keys(errors!)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido"
        case 'requiredTrue':
          return "Debe aceptar los terminos y condiciones"
        case 'minlength':
          return `Minimo ${errors!['minlength'].requiredLength} caracteres.`
        case 'maxlength':
          return `Maximo ${errors!['maxlength'].requiredLength} caracteres.`
        case 'min':
          return `Como minimo debe ser ${errors!['min'].min}.`
        case 'max':
          return `Como maximo debe ser ${errors!['max'].max}.`
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("invalid form");
      return;
    }

    console.log(this.form.value);
    this.especialista = this.form.value;
    const { nombre, apellido, edad, dni, especialidad, email, password, img } = this.form.value;
    this.especialista =
      {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        dni: dni,
        especialidad: especialidad,
        email: email,
        img: img,
        active: false
      } as Especialista;

    this.user =
      {
        email: email,
        clave: password,
      } as Usuario;

    this.auth.verficarNuevoUsuario(this.user.email)
      .then(verify => {
        if (!verify) {
          this.auth.register(this.user);
          this.especialistaService.agregarEspecialista(this.especialista!);
          this.form.reset();
          this.router.navigate(['/login']);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al crear cuenta',
            footer: 'El email ya esta registrado'
          });
        }
      });

  }

  getEspecialidad(especialidad: string) {
    this.form.controls['especialidad'].setValue(especialidad);
    console.log(especialidad);
  }
}
