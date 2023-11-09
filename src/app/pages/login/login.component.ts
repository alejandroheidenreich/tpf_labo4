import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { ActivateEspecialistaService } from 'src/app/services/activate-especialista.service';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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

  constructor(private spinner: NgxSpinnerService, private cUser: CurrentUserService, private auth: AuthService, private router: Router, private fb: FormBuilder, private actEsp: ActivateEspecialistaService, private userService: UsuarioService) { }

  onSubmit() {

    this.spinner.show();
    this.user =
    {
      email: this.form.controls['email'].value,
      clave: this.form.controls['clave'].value
    }

    this.auth.login(this.user)
      .then(res => {
        console.log(res);
        if (res) {
          this.cUser.currentUser.email = this.user.email;
          this.cUser.currentUser.clave = this.user.clave;
          this.userService.esAdmin(res.user!.email!)
            .subscribe(admin => {
              if (admin) {
                setTimeout(() => {
                  this.spinner.hide();
                  console.log("Admin log");
                  this.cUser.admin = admin;
                  this.router.navigateByUrl('/usuarios');
                }, 1000);
              } else {
                if (res.user!.emailVerified) {
                  this.actEsp.traerPorEmail(res.user!.email!)
                    .subscribe(esp => {
                      console.log(esp);
                      if (!esp || esp.active) {
                        this.userService.esPaciente(res.user!.email!).subscribe(paciente => {
                          if (paciente) {
                            setTimeout(() => {
                              this.spinner.hide();
                              this.cUser.paciente = paciente;
                              console.log("Paciente log");
                              this.router.navigateByUrl('/paciente');
                            }, 1000);
                          }
                        });
                        this.userService.esEspecialista(res.user!.email!).subscribe(especialista => {
                          if (especialista) {
                            setTimeout(() => {
                              this.spinner.hide();
                              this.cUser.especialista = especialista;
                              console.log("Especialista log");
                              this.router.navigateByUrl('/especialista');
                            }, 1000);
                          }
                        });
                      }
                      else {
                        setTimeout(() => {
                          this.spinner.hide();
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Cuenta no esta activada',
                            footer: 'Para verificar su cuenta comuniquese con administracion'
                          });
                        }, 1000);
                      }
                    });
                }
                else {
                  setTimeout(() => {
                    this.spinner.hide();
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Cuenta no verificada',
                      footer: 'Verificar cuenta antes de loguearse'
                    });
                  }, 1000);
                }
              }
            });

        } else {
          setTimeout(() => {
            this.spinner.hide();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario/contraseña incorrectos',
              footer: 'Vuelva a intentarlo'
            })
            console.log("error log");
          }, 1000);
        }
      });
  }

  loadAdmin() {
    this.form.controls['email'].setValue('admin@admin.com');
    this.form.controls['clave'].setValue('admin1');
  }
  loadPaciente() {
    this.form.controls['email'].setValue('xilapi5763@jybra.com');
    this.form.controls['clave'].setValue('paciente');
  }
  loadEspecialista() {
    this.form.controls['email'].setValue('lexol26062@hondabbs.com');
    this.form.controls['clave'].setValue('especialista');
  }
}
