import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/interfaces/admin.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public admin!: Admin;
  constructor(private auth: AuthService, private userServ: UsuarioService) { }

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.userServ.esAdmin(user?.email!).subscribe(
        (admin) => {
          if (admin)
            this.admin = admin as Admin;
        }
      );
    });
  }

  public select: string = 'usuarios';


  getSelect(selector: string): void {
    this.select = selector;
    console.log(this.select);
  }
}
