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
    return this.httpClient.post<any>('/login', { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<AuthResponseToken>('/user', { name, email, password })
      .pipe(
        tap((value) => {
          localStorage.setItem('auth-token', value.token);
        })
      );
  }

  recoveryPasswordForm(email: string) {
    return this.httpClient.patch('/user/recover-password', { email });
  }

  resetPasswordForm(password: string, token: string) {
    return this.httpClient.patch(`/user/reset-password?token=${token}`, {
      password,
    });
  }

  verifyTwoFA(code: string, emaiL: string) {
    return this.httpClient
      .post<AuthResponseToken>('/login/verify-2fa', { code, emaiL })
      .pipe(
        tap((value) => {
          localStorage.setItem('auth-token', value.token);
        })
      );
  }

  enableTwoFa(email: string, isTwoFactorEnabled: boolean) {
    const token = localStorage.getItem('auth-token') || '';

    return this.httpClient.patch(
      '/login/enable-2fa',
      { email, isTwoFactorEnabled },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  googleLogin(IdToken: string) {
    return this.httpClient
      .post<AuthResponseToken>('/login/login-google', { IdToken })
      .pipe(
        tap((value) => {
          localStorage.setItem('auth-token', value.token);
        })
      );
  }

  isTokenValid(token: string) {
    return this.httpClient.get<{ isValid: boolean }>('/user/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUser(token: string) {
    return this.httpClient.get('/user/get-user-by-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
