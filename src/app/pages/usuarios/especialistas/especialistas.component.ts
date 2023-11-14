import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css']
})
export class EspecialistasComponent implements OnInit {

  public especialistas!: Especialista[];

  constructor(private espService: EspecialistaService) { }

  ngOnInit(): void {
    this.espService.traer().subscribe(data => this.especialistas = data);
  }

  toggleActive(esp: Especialista) {
    console.log(esp);

    esp.active = !esp.active;
    this.espService.updateEspecialista(esp);
    this.espService.traer().subscribe(data => this.especialistas = data);
  }
}
