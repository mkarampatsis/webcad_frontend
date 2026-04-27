import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRegisterUser, IUser } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  getUser(userId: string) {
    return this.http.get<IUser>(`${environment.apiURL}/user/${userId}`);
  }

  updateUser(userId: string, userData: Partial<IUser>) {
    return this.http.put<IUser>(`${environment.apiURL}/user/${userId}`, userData);  
  }

  deleteUser(userId: string) {
    return this.http.delete(`${environment.apiURL}/user/${userId}`);
  }   
  
  registerUser(userData: Partial<IRegisterUser>) {
    return this.http.post<IUser>(`${environment.apiURL}/user/register`, userData);
  }  
}
