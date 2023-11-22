import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/interfaces/especialista.interface';
import { DatoDinamico, HistoriaClinica } from 'src/app/interfaces/historiaclinica.interface';
import { Paciente } from 'src/app/interfaces/paciente.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const logo = 'data:image/png;base64,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6aKSLazGgOOg4il5rscNc2/Gh7tL5ziiNJ11DvzmV4DoAd3d27n22mtoagqjtUM0GiWTKVmvKR9NW7GyYo0vD6ewf9l4qoYid8zJhaBdIurHg7sJAJIu9YkrJHnkha0FiZJOp4vafimUgnedDR+8TLTnKsQDHA1OjcQh3B8/1VoydK75Ilz8AdELxkMoBH/+Qbj62qoGg5KOg621m4b6ceF+CQBFEnxuM7z7PfDUf8KOl8TJAzJbZ92pcPa5sHJ11Xo+iMTvzWZrZt3Y2iAAFLNn166HNSeLgyiVAhQEc+ZiXuGrUuMrpPcPVDrBdRZROwTIw3HEi9YUlvTTPEpnD1UJGtifzhC3nZrJTqo9AuThQiWrJ5vlYLq2Vo+tDZq6GHk972g2y58SKbIuJOZEqF0JUGXkFhcn6Ti8mc5wIJ2pucaHEwSYEjTi5rVtSFoWvdksA5ZFwnbc7u8ZF7NEgNJMGMNduXmGIbNzRxrp+fIaSs7J/7/kvIzWdCdS6HgC27aLpt5YCp9hjBXFG/2cycxVNGYvfjA7BLAtCYBYFvQcySWEuIQEhoLe3vJwrONIEqnHA8pTXJlkxHnasiTA40zgC85DGXDoYHkyzFjPOZboGKu8FUSlWmUxsoa+LKWeX7LFMHMFd5OAVFKmyGCxUg1D0rUMU8quxjnPNGF+2+QaTiGNXxoOHvM50yivrCJyTu7vjDBLEsAuLt9SC3AcSdaYzHuVhXZn6TlziEqZgUmqtMzZWxR9VGivokoNAQrZSuVrQHOVKuWtgn7gb4CHKnGzSmpmBjI7uHI5WCcwFpIICarr9z6BEziBEziBWsf/B3cjegfAA5hWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTE4VDExOjUyOjE3KzAwOjAwZ0nOywAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0xOFQxMTo1MjoxNyswMDowMBYUdncAAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxOS0wMi0wMSBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmdBe+LIAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAA1MTLA0FBRAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUxMhx8A9wAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTU4NDUzMjMzNxZDJ9EAAAATdEVYdFRodW1iOjpTaXplADE4LjNLQkJsi+c6AAAAYXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8uL3VwbG9hZHMvNTYvUnpxdmNHSi8yMjUyL2F2YXRhcl9kb2N0b3JfaGVhbHRoX2hvc3BpdGFsX21lZGljYWxfaWNvbl8xNDAwOTYucG5nDVFnqwAAAABJRU5ErkJggg=='

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],

})
export class MiPerfilComponent implements OnInit {

  public paciente!: Paciente;
  public historialClinico: HistoriaClinica[] = [];
  public especialistas: Especialista[] = [];

  constructor(private auth: AuthService, private userServ: UsuarioService, private pac: PacientesService, private esp: EspecialistaService) { }

  ngOnInit(): void {
    this.auth.getUser().then((user) => {
      this.userServ.esPaciente(user?.email!).subscribe(
        (paciente) => {
          if (paciente) {
            this.paciente = paciente as Paciente;
            this.pac.traerHistorialClinicoPorId(this.paciente.idDoc).subscribe(historiales => {
              this.historialClinico = historiales;
            });
          }
        }
      );
    });
    this.esp.traer().subscribe(data => this.especialistas = data);

  }

  sacarKey(datos: DatoDinamico) {
    return Object.keys(datos)[0]
  }

  getEspecialista(email: string): string {

    for (const esp of this.especialistas) {
      if (esp.email === email) {
        return `${esp.nombre} ${esp.apellido}`;
      }
    }
    return '';
  }

  generarPDF() {

    let fecha = new Date(Date.now());

    let docDef = {
      content: [
        {
          image: logo,
          width: 110,
          height: 110,
        },
        { text: '\t\t\tClinica Online\n\n', style: 'logo' },
        { text: `Informe del Paciente ${this.paciente.nombre} ${this.paciente.apellido} \n Fecha: ${fecha.toLocaleDateString()}`, style: 'titulo' },
      ], styles: {
        header: {
          bold: true,
          fontSize: 15
        },
        logo: {
          bold: true,
          fontSize: 17
        },
        titulo: {
          bold: true,
          fontSize: 22,
        },
      },
      defaultStyle: {
        fontSize: 12
      }
    }

    const histo = this.formatearHistoriales();
    for (const h of histo) {

      docDef.content.push(h as any);
    }
    pdfMake.createPdf(docDef).open();
  }

  formatearHistoriales() {
    const historialesFomateados = [];
    for (const his of this.historialClinico) {
      historialesFomateados.push(this.historiaToPDF(his));
    }
    return historialesFomateados;
  }

  historiaToPDF(historial: HistoriaClinica) {
    const pdf =
      [{ text: `\n\n${this.getEspecialista(historial.especialsitaEmail)}`, style: 'header' },
      {
        ul: [
          `Altura: ${historial.altura}`,
          `Peso: ${historial.peso}`,
          `Temperatura: ${historial.temperatura}`,
          `Presion: ${historial.presion}`,
        ],
      }];

    for (const dato of historial.datos) {
      const key = this.sacarKey(dato);
      console.log(key, dato[key]);
      pdf[1]['ul']?.push(`${key}: ${dato[key]}`);
    }

    return pdf;
  }



}
