import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JornadaService } from 'src/app/services/jornada.service';
//import { EspecialidadService } from 'src/app/services/especialidad.service';
//import { Especialidad } from 'src/app/interfaces/especialidad.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private auth: AuthService, private jor: JornadaService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.auth.logout();
  }

  accion() {
    //this.jor.generarJornadaInicial();
  }

}
