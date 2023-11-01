import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { ImagenService } from 'src/app/services/imagen.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-especialista',
  templateUrl: './register-especialista.component.html',
  styleUrls: ['./register-especialista.component.css']
})
export class RegisterEspecialistaComponent {

  private especialista: Especialista | undefined;
  private user!: Usuario;
  private file: any;
  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    especialidad: this.fb.array([], [Validators.required]),
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    img: ['', [Validators.required]],
    terminos: [false, [Validators.requiredTrue]],
  });

  constructor(private fb: FormBuilder, private especialistaService: EspecialistaService, private auth: AuthService, private router: Router, private imagenService: ImagenService) { }

  get especialidad() {
    return this.form.get('especialidad') as FormArray;
  }

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
        active: false,
        idDoc: ''
      } as Especialista;

    this.user =
      {
        email: email,
        clave: password,
      } as Usuario;


    this.auth.register(this.user).then(res => {
      if (res == null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al crear cuenta',
          footer: "El email ya fue registrado"
        });
      } else {
        this.imagenService.subirImg(this.file)
          .then(path => {
            this.especialista!.img = path;
            this.especialistaService.agregarEspecialista(this.especialista!)
              .then(() => {

                this.form.reset();
                this.auth.logout();
                Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'Usuario registrado',
                  footer: "Recuerde verificar su email",
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => this.router.navigate(['/login']));

              });;
          });
      }
    });


  }

  getEspecialidad(especialidad: string) {
    const existe = this.elementoExisteEnFormArray(especialidad)
    if (existe === false) {
      this.especialidad.push(this.fb.control(especialidad, [Validators.required]));
      //console.log("Se agrego", especialidad);

    }
    else {
      this.especialidad.removeAt(existe);
      //console.log("Se removio", especialidad);
    }
  }

  elementoExisteEnFormArray(valor: string) {
    const formArray = this.form.get('especialidad') as FormArray;

    for (let i = 0; i < formArray.length; i++) {
      if (formArray.at(i).value === valor) {
        return i;
      }
    }
    return false;
  }


  uploadImage(foto: any) {
    this.file = foto.target.files[0];
    //console.log(this.file);
  }
}


