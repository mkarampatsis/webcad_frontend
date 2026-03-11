import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser, User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  getUser(userId: string) {
    return this.http.get<User>(`${environment.apiURL}/user/${userId}`);
  }

  updateUser(userId: string, userData: Partial<User>) {
    return this.http.put<User>(`${environment.apiURL}/user/${userId}`, userData);  
  }

  deleteUser(userId: string) {
    return this.http.delete(`${environment.apiURL}/user/${userId}`);
  }   
  
  registerUser(userData: Partial<RegisterUser>) {
    return this.http.post<User>(`${environment.apiURL}/user/register`, userData);
  }  
}
