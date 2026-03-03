import { Component } from '@angular/core';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  imports: [GoogleSigninButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
