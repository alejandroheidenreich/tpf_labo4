import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(public auth: AuthService, private router: Router) { }
  async goHome() {
    await this.auth.logout();

    this.router.navigate(['']);

  }
}
