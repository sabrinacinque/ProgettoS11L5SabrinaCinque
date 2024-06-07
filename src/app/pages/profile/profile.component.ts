import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../Models/i-user';

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
    const confirmed = window.confirm('Sei sicuro di voler cancellare il tuo profilo? Questa azione è irreversibile.');
    if (confirmed) {
      this.deleteProfile();
    }
  }

  deleteProfile() {
    this.authSvc.deleteUser(this.user.id).subscribe(() => {
      this.authSvc.logoutAfterDeletion();
    });
  }
}
