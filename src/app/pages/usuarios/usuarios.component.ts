import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  public select: string = 'usuarios';

  getSelect(selector: string): void {
    this.select = selector;
    console.log(this.select);
  }
}
