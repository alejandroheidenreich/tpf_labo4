import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
//import { EspecialidadService } from 'src/app/services/especialidad.service';
//import { Especialidad } from 'src/app/interfaces/especialidad.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private auth: AuthService/*, private es: EspecialidadService*/) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.auth.logout();
  }

  getUser() {
    this.auth.getUserLogged().subscribe(x => console.log(x));
    // const lista = [
    //   'Alergología',
    //   'Anestesiología',
    //   'Angiología',
    //   'Cardiología',
    //   'Endocrinología',
    //   'Estomatología',
    //   'Farmacología Clínica',
    //   'Gastroenterología',
    //   'Genética',
    //   'Geriatría',
    //   'Hematología',
    //   'Hepatología',
    //   'Infectología',
    //   'Medicina aeroespacial',
    //   'Medicina del deporte',
    //   'Medicina familiar y comunitaria',
    //   'Medicina física y rehabilitación',
    //   'Medicina forense',
    //   'Medicina intensiva',
    //   'Medicina interna',
    //   'Medicina preventiva y salud pública',
    //   'Medicina del trabajo',
    //   'Nefrología',
    //   'Neumología',
    //   'Neurología',
    //   'Nutriología',
    //   'Oncología médica',
    //   'Oncología radioterápica',
    //   'Pediatría',
    //   'Psiquiatría',
    //   'Reumatología',
    //   'Toxicología',
    //   'Cirugía cardíaca',
    //   'Cirugía general',
    //   'Cirugía oral y maxilofacial',
    //   'Cirugía ortopédica',
    //   'Cirugía pediátrica',
    //   'Cirugía plástica',
    //   'Cirugía torácica',
    //   'Cirugía vascular',
    //   'Neurocirugía',
    //   'Dermatología',
    //   'Ginecología y obstetricia o tocología',
    //   'Medicina de emergencia',
    //   'Oftalmología',
    //   'Otorrinolaringología',
    //   'Traumatología',
    //   'Urología',
    //   'Análisis clínico',
    //   'Anatomía patológica',
    //   'Bioquímica clínica',
    //   'Farmacología',
    //   'Genética médica',
    //   'Inmunología',
    //   'Medicina nuclear',
    //   'Microbiología y parasitología',
    //   'Neurofisiología clínica',
    //   'Radiología',]

    // lista.forEach(x => {
    //   this.es.agregarEspecialidad({ nombre: this.quitarAcentos(x) } as Especialidad);
    // })
  }

  // quitarAcentos(texto: string): string {
  //   return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }
}
