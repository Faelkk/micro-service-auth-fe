import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface SignupForm {
  email: FormControl;
  password: FormControl;
  name: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  preventFocusLoss(event: MouseEvent) {
    event.preventDefault();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigate() {
    this.router.navigate(['signin']);
  }

  submit() {
    this.authService
      .signup(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.name
      )
      .subscribe({
        next: () => this.toastService.success('Conta criada com sucesso!'),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          ),
      });
  }
}
