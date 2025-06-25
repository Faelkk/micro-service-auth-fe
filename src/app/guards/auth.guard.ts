import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      this.router.navigate(['/signin']);
      return of(false);
    }

    return this.authService.isTokenValid(token).pipe(
      map((res) => {
        if (res.isValid) {
          return true;
        } else {
          this.router.navigate(['/signin']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/signin']);
        return of(false);
      })
    );
  }
}
