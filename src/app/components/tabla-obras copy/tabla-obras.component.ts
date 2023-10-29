import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-tabla-obras',
  templateUrl: './tabla-obras.component.html',
  styleUrls: ['./tabla-obras.component.css']
})
export class TablaPaisesComponent implements OnInit {
  @Output() public country = new EventEmitter<string>();



  ngOnInit(): void {

  }


}
