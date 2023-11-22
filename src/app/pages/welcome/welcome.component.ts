import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JornadaService } from 'src/app/services/jornada.service';
import { PacientesService } from 'src/app/services/pacientes.service';
//import { EspecialidadService } from 'src/app/services/especialidad.service';
//import { Especialidad } from 'src/app/interfaces/especialidad.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private auth: AuthService, private jor: JornadaService, private pac: PacientesService) { }

  ngOnInit(): void {
    this.logout();
    //this.pac.agregarHistorialPaciente({ temp: "36", date: "Hola" }, 'NSDgcrdHpkqpINz6JmBc')
    // this.pac.traerHistorialClinicoPorId('NSDgcrdHpkqpINz6JmBc').subscribe(data => {
    //   console.log(data);

    // });
  }

  logout() {
    this.auth.logout();
  }

  accion() {
    //this.jor.generarJornadaInicial();
  }

}
