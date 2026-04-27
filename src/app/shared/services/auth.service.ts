import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { GoogleClientId } from '../../shared/config';

const API_AUTH_URL = `${environment.apiURL}/auth`;

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  user = signal<IUser | null>(null);

  constructor() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      
      const decodedTokenSubject = jwtDecode(access_token) as unknown as IUser;
      this.user.set({
        userId: decodedTokenSubject.userId,
        email: decodedTokenSubject.email,
        name: decodedTokenSubject.name,
        photoUrl: decodedTokenSubject.photoUrl,
        roles: decodedTokenSubject.roles
      });
    }
    // effect(() => {
    //   if (this.user()) {
    //     console.log('User logged in:', this.user()?.email);
    //   } else {
    //     console.log('No user logged in');
    //   }
    // });
  }
  
  loginGoogle(token: string) {
    return this.http.post<{token:string}>(`${API_AUTH_URL}/google`,{token});
  }

  loginUser(credentials: {email: string, password:string}) {
    return this.http.post<{token:string}>(`${API_AUTH_URL}/login`,{credentials});
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: GoogleClientId,
      callback: (response: any) => this.handleCredential(response)
    });
    
    google.accounts.id.prompt(); // Display the One Tap prompt automatically on page load
    
    return google;
  }

  handleCredential(response: any) {
    const idToken = response.credential;

    // send to backend
    // response.credential is the JWT token
    // console.log('Encoded JWT ID token: ' + response.credential);
    this.loginGoogle(idToken)
      .subscribe({
        next: (res) => {
          // console.log('Backend login success', res)
          const decodedToken = jwtDecode(res.token) as IUser;
          this.user.set(decodedToken);
          localStorage.setItem('accessToken', res.token);
          // console.log('Decoded token:', decodedToken);
          this.router.navigate(['/than-cad']);
        },
        error: (err) => console.error('Backend login error', err),
      })
  }

    isTokenExpired(): boolean {
      const token = localStorage.getItem("accessToken");
      if (!token) return true;

      try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp;
        const now = Math.floor(Date.now() / 1000);
        return exp < now;
      } catch (e) {
        return true; // treat invalid token as expired
      }
    }

  signOut() {
    google.accounts.id.disableAutoSelect();

    // this.http.post(`${APIPREFIX}/logout`, this.userInfo()).pipe(take(1)).subscribe();
    // Sto backend gia logout
    // Log(user_id=data["user_id"], action="logout", data={"email": data["email"]}).save()
  }

  removeUser(){
    this.user.set(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
