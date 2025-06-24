import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ActivatedRoute } from '@angular/router';

interface ResetPasswordForm {
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-reset-password',
  imports: [PrimaryInputComponent, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup<ResetPasswordForm>;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (
      this.resetPasswordForm.value.password !==
      this.resetPasswordForm.value.confirmPassword
    ) {
      this.toastService.error('As senhas não coincidem.');
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.toastService.error('Token inválido ou ausente.');
      return;
    }

    this.authService
      .resetPasswordForm(this.resetPasswordForm.value.password, token)
      .subscribe({
        next: () => this.toastService.success('Senha redefinida com sucesso!'),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde.'
          ),
      });
  }
}
