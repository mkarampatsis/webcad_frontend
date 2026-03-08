import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const API_AUTH_URL = `${environment.apiURL}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  user = signal<User | null>(null);

  constructor() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      
      const decodedTokenSubject = jwtDecode(access_token) as unknown as User;
      this.user.set({
        id: decodedTokenSubject.id,
        email: decodedTokenSubject.email,
        name: decodedTokenSubject.name,
        picture: decodedTokenSubject.picture,
        roles: decodedTokenSubject.roles
      });
    }
    effect(() => {
      if (this.user()) {
        console.log('User logged in:', this.user()?.email);
      } else {
        console.log('No user logged in');
      }
    });
  }
  
  login(token: string) {
    return this.http.post<{token:string, user:User}>(`${API_AUTH_URL}/google`,{token});
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['user-login-example']);
  }
  
  signOut() {
    this.socialAuthService.signOut();
    this.http.post(`${APIPREFIX}/logout`, this.userInfo()).pipe(take(1)).subscribe();
  }

  removeUser(){
    this.user.set(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
