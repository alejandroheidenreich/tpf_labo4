import { Component, OnInit } from '@angular/core';
import { Jornada } from 'src/app/interfaces/jornada.interface';
import { AuthService } from 'src/app/services/auth.service';
import { JornadaService } from 'src/app/services/jornada.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  public email!: string;
  public jornada!: Jornada;
  public selected: string = 'lunes';

  constructor(private auth: AuthService, private jor: JornadaService) { }

  ngOnInit(): void {
    this.auth.getUser()
      .then((res) => {
        if (res) {
          this.email = res!.email as string;
          this.jor.traerJornada(this.email).subscribe(jornada => {
            this.jornada = jornada
          });
        }
      });
  }


  changeSelect(sel: string) {
    this.selected = sel;
  }
}
