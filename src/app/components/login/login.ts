import { Component, inject } from '@angular/core';

import { GoogleClientId } from '../../shared/config';
import { AuthService } from 'src/app/shared/services/auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  authService = inject(AuthService);
  user = this.authService.user;

  ngOnInit() {
    this.authService.initializeGoogleSignIn();
  }
}
