import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service.service';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [AuthService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  loginForm!: FormGroup<LoginForm>;
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  loginWithGoogle(idToken: string) {
    this.authService.googleLogin(idToken).subscribe({
      next: () =>
        this.toastService.success('Login com Google feito com sucesso!'),
      error: () =>
        this.toastService.error('Erro ao logar com Google, tente novamente.'),
    });
  }

  preventFocusLoss(event: MouseEvent) {
    event.preventDefault();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  submit() {



    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => this.toastService.success('Login feito com sucesso!'),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          ),
      });
  }
}
