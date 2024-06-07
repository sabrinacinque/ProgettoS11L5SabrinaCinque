import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: iUser;
  router: any;

  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  confirmDelete() {
    Swal.fire({
      title: 'Sei sicuro?',
      text: 'Questa azione è irreversibile!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sì, cancella il mio profilo!',
      cancelButtonText: 'Annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProfile();
      }
    });
  }

  deleteProfile() {
    this.authSvc.deleteUser(this.user.id).subscribe(() => {
      this.authSvc.logoutAfterDeletion();
    });
  }
}
