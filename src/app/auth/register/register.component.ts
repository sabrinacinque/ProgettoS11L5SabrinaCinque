import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { iUser } from '../../Models/i-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Importa Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Usa styleUrls invece di styleUrl
})
export class RegisterComponent {

  newUser: Partial<iUser> = {}

  @ViewChild('registerForm') registerForm: NgForm | null = null;

  constructor(private authSvc: AuthService, private router: Router) {} // Inietta Router

  register() {
    if (this.registerForm && this.registerForm.valid) {
      this.authSvc.register(this.newUser).subscribe(() => {
        Swal.fire({
          title: 'Registrazione avvenuta con successo',
          text: 'Verrai reindirizzato al login per entrare subito a far parte della nostra ciurma!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          if (this.registerForm) {
            this.registerForm.resetForm(); // per pulire il form
          }

          this.router.navigate(['/auth/login']); // reindirizza al login
        });
      });
    }
  }
}
