import { Component, inject } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, GoogleSigninButtonDirective } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonDirective],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(SocialAuthService);

  loginWithGoogle() { 
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID) 
      .then(user => { 
        console.log('Google user:', user); 
      }) 
      .catch(err => console.error(err)); 
  } 
  
  logout() { 
    this.authService.signOut(); 
  }
}
