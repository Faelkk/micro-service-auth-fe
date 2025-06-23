import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service.service';

interface RecoveryPasswordForm {
  email: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, PrimaryInputComponent],
  providers: [AuthService],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss',
})
export class RecoveryPasswordComponent {
  recoveryPasswordForm!: FormGroup<RecoveryPasswordForm>;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.recoveryPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit() {
    this.authService
      .recoveryPasswordForm(this.recoveryPasswordForm.value.email)
      .subscribe({
        next: () => this.toastService.success('Email enviado com sucesso!'),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde'
          ),
      });
  }
}
