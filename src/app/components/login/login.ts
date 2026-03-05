import { Component, inject } from '@angular/core';

import { GoogleClientId } from '../../shared/config';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})



export class Login {
  
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
