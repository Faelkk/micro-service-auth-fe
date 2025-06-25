import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userData: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      this.logout();
      return;
    }

    this.authService.getUser(token).subscribe({
      next: (data) => (this.userData = data),
      error: () => this.logout(),
    });
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/signin']);
  }
}
