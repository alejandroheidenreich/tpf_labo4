import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { ImagenService } from 'src/app/services/imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  private file: any
  private user!: Usuario;
  private admin!: Admin;
  private currentUser: any;

  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    img: ['', [Validators.required]],
    terminos: [false, [Validators.requiredTrue]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private imgService: ImagenService, private admService: AdminService, private cUser: CurrentUserService) { }

  ngOnInit(): void {
    this.form.reset();

  }
  uploadImage(foto: any) {
    this.file = foto.target.files[0];
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

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("invalid form");
      return;
    }

    this.admin = this.form.value;
    const { nombre, apellido, edad, dni, email, password, img } = this.form.value;
    this.admin =
      {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        dni: dni,
        email: email,
        img: img,
        idDoc: ''
      } as Admin;

    this.user =
      {
        email: email,
        clave: password,
      } as Usuario;

    // let userEmail = await this.auth.getUser();
    // console.log(userEmail?.email);

    this.auth.registerAdmin(this.user).then(async res => {
      if (!res) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al crear cuenta',
          footer: "El email ya fue registrado"
        });
      } else {
        await this.auth.login(this.cUser.currentUser);
        // userEmail = await this.auth.getUser();
        // console.log(userEmail?.email);
        this.imgService.subirImg(this.file)
          .then(path => {
            this.admin!.img = path;
            this.admService.agregarAdmin(this.admin!)
              .then(() => {
                this.form.reset();
                //this.auth.logout();

                Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'Admin registrado',
                  showConfirmButton: false,
                  timer: 1500
                });
              });;
          });
      }
    });
  }

  getUser() {
    this.auth.getUser().then(x => console.log(x));

  }
}
