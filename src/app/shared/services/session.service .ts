import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


const API_SESSION_URL = `${environment.apiURL}/session`;

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  authService = inject(AuthService);
  user = this.authService.user;

  sessionId = signal<string | null>(null);
  sessionUrl = signal<string | null>(null);

  createSession() {
    const user = this.user();
    if (!user) {
      console.error('No user logged in');
      return;
    }
    console.log('Creating session for user', user);
    this.http.post<{sessionId: string, url: string}>(`${API_SESSION_URL}/start`, { sessionData: user })
      .subscribe({
        next: (res) => {
          console.log('Session created', res);
          this.sessionId.set(res.sessionId);
          this.sessionUrl.set(res.url);
        },
        error: (err) => console.error('Failed to create session', err),
      });
  }

  stopSession() {
    const sessionId = this.sessionId();
    if (!sessionId) {
      console.error('No active session to stop');
      return;
    }

    this.http.post(`${API_SESSION_URL}/stop/${sessionId}`, {})
      .subscribe({
        next: () => {
          console.log('Session stopped');
          this.sessionId.set(null);
          this.sessionUrl.set(null);
        },
        error: (err) => console.error('Failed to stop session', err),
      });
  } 
}
