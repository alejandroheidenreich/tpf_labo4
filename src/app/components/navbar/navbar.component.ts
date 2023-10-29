import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public logAction: string = 'Log In';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getUserLogged().subscribe(user => {
      console.log(user);
      if (user != null) {
        this.logAction = "Log Out";
      } else {
        this.logAction = "Log In";
      }
    });
  }

  log() {
    if (this.logAction == "Log In") {
      this.router.navigateByUrl('log');
    } else {
      this.auth.logout();
    }
  }
}
