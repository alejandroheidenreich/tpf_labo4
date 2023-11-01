import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { ImagenService } from 'src/app/services/imagen.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public pacientes!: Paciente[];

  constructor(private pacientesService: PacientesService, private imgService: ImagenService) { }

  ngOnInit(): void {
    this.pacientesService.traer().subscribe(pacientes => this.pacientes = pacientes);
  }


}
