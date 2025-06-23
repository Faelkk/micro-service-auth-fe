import { Injectable } from '@angular/core';
import { AuthResponseToken } from '../types/auth-response.type';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseToken>('/login', { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<AuthResponseToken>('/user', { name, email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }

  recoveryPasswordForm(email: string) {
    return this.httpClient.patch('/recover-password', { email });
  }
}
