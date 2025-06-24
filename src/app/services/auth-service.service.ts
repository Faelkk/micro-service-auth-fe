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

  resetPasswordForm(password: string, token: string) {
    return this.httpClient.patch(`/reset-password?token=${token}`, {
      password,
    });
  }

  verifyTwoFA(code: string) {
    return this.httpClient.post('/verify-2fa', { code });
  }

  enableTwoFa(email: string, isTwoFactorEnabled: boolean) {
    return this.httpClient.patch('/enable-2fa', { email, isTwoFactorEnabled });
  }

  googleLogin(IdToken: string) {
    return this.httpClient
      .post<AuthResponseToken>('/login-google', { IdToken })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }
}
