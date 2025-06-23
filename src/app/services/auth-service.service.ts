import { Injectable } from '@angular/core';
import { SigninResponse } from '../types/auth-response.type';
import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(name: string, password: string) {
    return this.httpClient
      .post<SigninResponse>('/login', { name, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }
}
