import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import Swal from 'sweetalert2';
import { RecaptchaErrorParameters } from "ng-recaptcha";

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrls: ['./register-paciente.component.css']
})
export class RegisterPacienteComponent {
  private paciente: Paciente | undefined;
  private user!: Usuario;
  private file1: any;
  private file2: any;
  public captcha: string = '';


  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    obra: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    imagen1: ['', [Validators.required]],
    imagen2: ['', [Validators.required]],
    terminos: [false, [Validators.requiredTrue]],
  });

  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private pacienteService: PacientesService, private auth: AuthService, private router: Router, private imagenService: ImagenService) { }

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

  public resolved(captchaResponse: string): void {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = captchaResponse;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }



  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("invalid form");
      return;
    }

    const { nombre, apellido, edad, dni, obra, email, password, imagen1, imagen2 } = this.form.value;
    this.paciente =
      {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        dni: dni,
        obraSocial: obra,
        email: email,
        img1: imagen1,
        img2: imagen2,
        idDoc: ''
      } as Paciente;

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
        this.registrarPaciente();
      }
    });
  }

  async registrarPaciente() {
    this.spinner.show();
    const path1 = await this.imagenService.subirImg(this.file1);
    this.paciente!.img1 = path1;
    const path2 = await this.imagenService.subirImg(this.file2);
    this.paciente!.img2 = path2;
    const res = await this.pacienteService.agregarPaciente(this.paciente!)
    console.log(res);
    this.form.reset();


    setTimeout(() => {
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Usuario registrado',
        footer: "Recuerde verificar su email",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.auth.logout();
        this.router.navigate(['/login'])
      });
      this.spinner.hide();
    }, 1000);


  }


  // registrarPaciente() {
  //   this.imagenService.subirImg(this.file1)
  //     .then(path => {
  //       this.paciente!.img1 = path;
  //       this.imagenService.subirImg(this.file2)
  //         .then(path2 => {
  //           this.paciente!.img2 = path2;
  //           this.pacienteService.agregarPaciente(this.paciente!)
  //             .then(x => {
  //               if (x) {
  //                 this.form.reset();
  //                 //this.auth.logout();
  //                 Swal.fire({
  //                   position: 'bottom-end',
  //                   icon: 'success',
  //                   title: 'Usuario registrado',
  //                   footer: "Recuerde verificar su email",
  //                   showConfirmButton: false,
  //                   timer: 1500
  //                 }).then(() => this.router.navigate(['/login']));

  //               } else {
  //                 Swal.fire({
  //                   icon: 'error',
  //                   title: 'Oops...',
  //                   text: 'Error al crear cuenta',
  //                   footer: "Ocurrio un problema"
  //                 });
  //               }
  //             });
  //         });
  //     });
  // }

  getObra(obra: string) {
    this.form.controls['obra'].setValue(obra);
  }

  uploadImageUno(foto: any) {
    this.file1 = foto.target.files[0];
  }

  uploadImageDos(foto: any) {
    this.file2 = foto.target.files[0];
  }
}
