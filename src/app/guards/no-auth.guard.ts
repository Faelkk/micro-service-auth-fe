import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return of(true);
    }

    return this.authService.isTokenValid(token).pipe(
      map((res) => {
        if (res.isValid) {
          this.router.navigate(['/user']);
          return false;
        } else {
          return true;
        }
      }),
      catchError((err) => {
        return of(true);
      })
    );
  }
}
