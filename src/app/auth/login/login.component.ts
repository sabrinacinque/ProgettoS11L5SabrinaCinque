import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { iAuthData } from '../../Models/i-auth-data';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authData:iAuthData = {
    email: '',
    password: ''
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
  ){}

  login() {
    this.authSvc.login(this.authData)
      .subscribe({
        next: () => {
          Swal.fire({
            title: 'Login avvenuto con successo',
            text: 'Benvenuto a bordo!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Errore di Login',
            text: 'Utente o password errati',
            icon: 'error',
            confirmButtonText: 'Riprova'
          });
        }
      });
  }
}
