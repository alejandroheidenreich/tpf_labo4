import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public especialista!: Especialista;

  constructor(private cUser: CurrentUserService, private auth: AuthService, private userServ: UsuarioService) { }

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.userServ.esEspecialista(user?.email!).subscribe(
        (esp) => {
          if (esp)
            this.especialista = esp as Especialista;
        }
      );
    });
  }



}
