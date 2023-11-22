import { Component } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad.interface';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-alta-especialidad',
  templateUrl: './alta-especialidad.component.html',
  styleUrls: ['./alta-especialidad.component.css']
})
export class AltaEspecialidadComponent {
  public file: any;
  public especialidad!: Especialidad;


  constructor(private imagenService: ImagenService, private esp: EspecialidadService) { }

  uploadImage(foto: any) {
    this.file = foto.target.files[0];
  }

  onSubmit() {
    this.imagenService.subirImgEspecialidad(this.file)
      .then(path => {
        console.log(path);

      });;


  }

}
