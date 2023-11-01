import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  @Output() salida = new EventEmitter<string>();

  constructor(private router: Router, private authService: AuthService) { }

  elegir(selector: string): void {
    this.salida.emit(selector);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
