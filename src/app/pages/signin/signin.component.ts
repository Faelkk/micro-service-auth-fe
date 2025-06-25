import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

declare const google: any; // Declaração para evitar erro de tipagem do Google Identity

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
export class SigninComponent implements OnInit {
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

  ngOnInit(): void {}

  handleGoogleResponse(response: any) {
    const idToken = response.credential;
    console.log('caiu', idToken);

    this.loginWithGoogle(idToken);
  }

  loginWithGoogle(idToken: string) {
    console.log(idToken);

    this.authService.googleLogin(idToken).subscribe({
      next: () => {
        this.toastService.success('Login com Google feito com sucesso!');
        this.router.navigate(['user']);
      },
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
    if (this.loginForm.invalid) {
      return;
    }

    console.log('caiu no click do submit');

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('auth-token', response.token);
            this.toastService.success('Login feito com sucesso!');
            this.router.navigate(['user']);
          } else if (response.message?.includes('dois fatores')) {
            this.toastService.info(
              'Código de verificação enviado para seu e-mail.'
            );
            this.router.navigate(['verify-two-fa'], {
              queryParams: { email: response.email },
            });
          } else {
            this.toastService.error('Resposta inesperada do servidor.');
          }
        },
        error: () => {
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde.'
          );
        },
      });
  }
}
