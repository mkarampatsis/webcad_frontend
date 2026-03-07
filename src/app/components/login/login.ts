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

  authService = inject(AuthService)

  ngOnInit() {
    this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: GoogleClientId,
      callback: (response: any) => this.handleCredential(response)
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt(); // Display the One Tap prompt automatically on page load
  }

  handleCredential(response: any) {
    const idToken = response.credential;

    // send to backend
    // response.credential is the JWT token
    console.log('Encoded JWT ID token: ' + response.credential);
    this.authService.login(idToken)
      .subscribe({
        next: (res) => console.log('Backend login success', res),
        error: (err) => console.error('Backend login error', err),
      })
  }

  // loginWithGoogle() { 
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID) 
  //     .then(user => { 
  //       console.log('Google user:', user); 
  //     }) 
  //     .catch(err => console.error(err)); 
  // } 
  
  // logout() { 
  //   this.authService.signOut(); 
  // }
}
