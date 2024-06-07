import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { iAuthData } from '../../Models/i-auth-data';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
          alert("Login avvenuto con successo");
          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
         alert("Utente o password errati")
        }
      });
  }
}
