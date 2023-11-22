import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/animation';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class PacienteComponent {


  constructor(private contexts: ChildrenOutletContexts, private auth: AuthService) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  logout() {
    this.auth.logout();
  }
}
