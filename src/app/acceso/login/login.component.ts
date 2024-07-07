import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/menu/dashboard']);
      },
      error => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.error = error.message; 
      }
    );
  }

}
