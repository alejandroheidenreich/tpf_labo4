import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ActivateEspecialistaService } from 'src/app/services/activate-especialista.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user!: Usuario;
  public form: FormGroup = this.fb.group({
    email: [""],
    clave: [""]
  });

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private actEsp: ActivateEspecialistaService) { }

  onSubmit() {

    this.user =
    {
      email: this.form.controls['email'].value,
      clave: this.form.controls['clave'].value
    }

    this.auth.login(this.user)
      .then(res => {
        console.log(res);

        if (res) {
          if (res.user!.emailVerified) {
            this.actEsp.traerPorEmail(res.user!.email!)
              .subscribe(esp => {

                console.log(esp);

                if (!esp || esp.active) {
                  this.router.navigateByUrl('');
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cuenta no esta activada',
                    footer: 'Para verificar su cuenta comuniquese con administracion'
                  });
                }
              });
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Cuenta no verificada',
              footer: 'Verificar cuenta antes de loguearse'
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario/contraseña incorrectos',
            footer: 'Vuelva a intentarlo'
          })
          console.log("error log");
        }
      });
  }
}
