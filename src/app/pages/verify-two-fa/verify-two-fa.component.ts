import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service.service';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

interface VerifyTwoFaForm {
  code: FormControl;
}

@Component({
  selector: 'app-verify-two-fa',
  imports: [ReactiveFormsModule, PrimaryInputComponent],
  templateUrl: './verify-two-fa.component.html',
  styleUrl: './verify-two-fa.component.scss',
})
export class VerifyTwoFaComponent {
  verifyTwoFaPasswordForm!: FormGroup<VerifyTwoFaForm>;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.verifyTwoFaPasswordForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
    });
  }

  submit() {
    this.authService
      .verifyTwoFA(this.verifyTwoFaPasswordForm.value.code)
      .subscribe({
        next: () =>
          this.toastService.success(
            'Verificação de dois fatores realizada com sucesso!'
          ),
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde.'
          ),
      });
  }
}
