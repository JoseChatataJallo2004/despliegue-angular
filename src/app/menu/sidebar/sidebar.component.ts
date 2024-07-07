import { Component } from '@angular/core';
import { LoginService } from '../../acceso/services/login.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private loginService: LoginService,
    private router:Router
  ) {}

  titulo="Team Miner Peru"

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['/login'])
  }

}
