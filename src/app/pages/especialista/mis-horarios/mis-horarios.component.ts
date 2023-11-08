import { Component, OnInit } from '@angular/core';
import { Cronograma, Dias, Horario, HorarioCronograma, Jornada, JornadaDiaView, convertirJornadaACronograma, esJornadaValida } from 'src/app/interfaces/jornada.interface';
import { AuthService } from 'src/app/services/auth.service';
import { JornadaService } from 'src/app/services/jornada.service';
import { LoginComponent } from '../../login/login.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {

  public cronograma!: Cronograma;
  public email: string = '';
  public lunes!: JornadaDiaView;
  public martes!: JornadaDiaView;
  public miercoles!: JornadaDiaView;
  public jueves!: JornadaDiaView;
  public viernes!: JornadaDiaView;
  public sabado!: JornadaDiaView;
  public lunesConsultorio: string = 'consultorio1';
  public martesConsultorio: string = 'consultorio1';
  public miercolesConsultorio: string = 'consultorio1';
  public juevesConsultorio: string = 'consultorio1';
  public viernesConsultorio: string = 'consultorio1';
  public sabadoConsultorio: string = 'consultorio1';
  public jornadaEsp!: Jornada;
  public diasEsp!: Dias;
  public lunesHorario!: Horario[];
  public martesHorario!: Horario[];
  public miercolesHorario!: Horario[];
  public juevesHorario!: Horario[];
  public viernesHorario!: Horario[];
  public sabadoHorario!: Horario[];

  constructor(private jor: JornadaService, private auth: AuthService) { }

  ngOnInit(): void {
    this.jor.traerCronograma().subscribe((res) => {
      this.lunes = this.jor.getHorario(res, 'lunes');
      this.martes = this.jor.getHorario(res, 'martes');
      this.miercoles = this.jor.getHorario(res, 'miercoles');
      this.jueves = this.jor.getHorario(res, 'jueves');
      this.viernes = this.jor.getHorario(res, 'viernes');
      this.sabado = this.jor.getHorario(res, 'sabado');

      this.filtrarTomados();
      this.cronograma = res;
    });

    this.auth.getUser()
      .then((res) => {
        if (res) {
          this.email = res!.email as string;
        }
      });
  }

  toggleActive(hora: HorarioCronograma) {
    hora.disponible = !hora.disponible;
  }

  filtrarTomados() {
    this.lunes = this.filtrar(this.lunes);
    this.martes = this.filtrar(this.martes);
    this.miercoles = this.filtrar(this.miercoles);
    this.jueves = this.filtrar(this.jueves);
    this.viernes = this.filtrar(this.viernes);
    this.sabado = this.filtrar(this.sabado);
  }


  filtrar(dia: JornadaDiaView) {
    const nuevo = {} as JornadaDiaView;

    for (const consultorio in dia) {
      nuevo[consultorio] = dia[consultorio].filter((hora: HorarioCronograma) => hora.disponible);
    }

    return nuevo;
  }

  guardar() {
    this.lunesHorario = [];
    this.martesHorario = [];
    this.miercolesHorario = [];
    this.juevesHorario = [];
    this.viernesHorario = [];
    this.sabadoHorario = [];

    this.generarJornada(this.lunes, this.lunesHorario);
    this.generarJornada(this.martes, this.martesHorario);
    this.generarJornada(this.miercoles, this.miercolesHorario);
    this.generarJornada(this.jueves, this.juevesHorario);
    this.generarJornada(this.viernes, this.viernesHorario);
    this.generarJornada(this.sabado, this.sabadoHorario);


    this.diasEsp = {
      lunes: this.lunesHorario,
      martes: this.martesHorario,
      miercoles: this.miercolesHorario,
      jueves: this.juevesHorario,
      viernes: this.viernesHorario,
      sabado: this.sabadoHorario,
    };

    this.jornadaEsp = {
      email: this.email,
      dias: this.diasEsp,
      id: '',
    };

    console.log("Jornada Final: ", this.jornadaEsp);

    const valida = esJornadaValida(this.jornadaEsp);

    if (valida) {
      console.log("Es valida");
      const crono = convertirJornadaACronograma(this.jornadaEsp);
      console.log("PARA ACTUALIZAR:", crono);

      const actCrono = this.jor.actualizarCronograma(this.cronograma, crono);

      console.log("ACTUALIZADO: ", actCrono);
      this.jor.updateCronograma(actCrono);
      this.jor.agregarJornada(this.jornadaEsp);

    }
    else {
      console.log("No es valida");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Horarios invalidos',
        footer: 'Verifique que no tenga en un dia horarios repetidos'
      });
    }

  }


  generarJornada(dia: JornadaDiaView, horario: Horario[]) {
    for (const consult in dia) {
      for (const hora in dia[consult]) {
        if (!dia[consult][hora]['disponible']) {
          horario.push({
            hora: dia[consult][hora]['hora'],
            nroConsultorio: parseInt(consult[consult.length - 1])
          });
        }
      }
    }
  }

}
