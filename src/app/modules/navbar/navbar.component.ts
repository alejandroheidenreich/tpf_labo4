import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public rol: string = '';

  public activeRol!: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.rol);
  }

  logout() {
    this.auth.logout();
  }

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }


  getRol(rol: string) {
    this.activeRol = rol;
  }
}
