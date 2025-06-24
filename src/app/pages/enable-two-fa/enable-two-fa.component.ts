import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { AuthService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
interface UserForm {
  email: FormControl;
}

@Component({
  selector: 'app-enable-two-fa',
  imports: [ReactiveFormsModule, PrimaryInputComponent],
  templateUrl: './enable-two-fa.component.html',
  styleUrl: './enable-two-fa.component.scss',
})
export class EnableTwoFaComponent {
  userForm!: FormGroup<UserForm>;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit() {
    this.authService.enableTwoFa(this.userForm.value.email, true).subscribe({
      next: () =>
        this.toastService.success(
          'Verificação de dois fatores ativada com sucesso!'
        ),
      error: () =>
        this.toastService.error('Erro inesperado! Tente novamente mais tarde.'),
    });
  }
}
