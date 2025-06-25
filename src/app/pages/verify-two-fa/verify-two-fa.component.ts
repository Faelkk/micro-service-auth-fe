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
import { Router, ActivatedRoute } from '@angular/router';

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
  email: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  submit() {
    if (this.verifyTwoFaPasswordForm.invalid) {
      return;
    }

    this.authService
      .verifyTwoFA(this.verifyTwoFaPasswordForm.value.code, this.email)
      .subscribe({
        next: () => {
          this.toastService.success(
            'Verificação de dois fatores realizada com sucesso!'
          );
          this.router.navigate(['user']);
        },
        error: () =>
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde.'
          ),
      });
  }
}
