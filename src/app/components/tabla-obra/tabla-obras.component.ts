import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ObraSocial } from 'src/app/interfaces/obraSocial.interface';
import { ObraSocialService } from 'src/app/services/obra-social.service';

@Component({
  selector: 'app-tabla-obras',
  templateUrl: './tabla-obras.component.html',
  styleUrls: ['./tabla-obras.component.css']
})
export class TablaObrasComponent implements OnInit {//todo: change name
  @Output() public obras = new EventEmitter<string>();

  public rowClicked!: number;
  public obrasociales: ObraSocial[] = [];
  constructor(private obraSocialService: ObraSocialService) { }

  ngOnInit(): void {
    this.getObras();
  }

  getObras() {
    this.obraSocialService.obtenerObras(this.obrasociales);
  }

  onClickRow(obra: any, idx: number) {
    if (this.rowClicked === idx) {
      this.rowClicked = -1;
      this.obras.emit('');
    }
    else {
      this.obras.emit(obra);
      this.rowClicked = idx;
    }
    console.log("rowClicked: " + this.rowClicked);
  }

}
