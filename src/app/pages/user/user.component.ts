import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userData!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      this.logout();
      return;
    }

    this.authService.getUser(token).subscribe({
      next: (data: any) => (this.userData = data as User),
      error: () => this.logout(),
    });
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/signin']);
  }
}
