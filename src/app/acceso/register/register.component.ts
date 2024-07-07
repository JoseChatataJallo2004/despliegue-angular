import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from '../services/register.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private registrarService: RegisterService,
    private router: Router
  ) { }

  register() {
    if (!this.email || !this.username || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor completa todos los campos.',
        showConfirmButton: false,
        timer: 1500
      });
      
      console.log('Por favor completa todos los campos.');
      return; 
    }
  
    this.registrarService.registerUser(this.email, this.username, this.password)
      .subscribe(
        response => {
          if (response.status == 1) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: response.message,
              showConfirmButton: true,
              timer: 1500
            }).then(() => {
              // Redireccionar al componente deseado
              this.router.navigate(['/']);
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.log('Error al registrar:', error);
          console.log('Mensaje de error:', error.error); 
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.error.message,
            showConfirmButton: true,
            timer: 1500
          });
        }
    );
  }

}
