import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public paciente!: Paciente;

  constructor(private auth: AuthService, private userServ: UsuarioService) { }

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.userServ.esPaciente(user?.email!).subscribe(
        (pac) => {
          if (pac)
            this.paciente = pac as Paciente;
        }
      );
    });
  }
}
