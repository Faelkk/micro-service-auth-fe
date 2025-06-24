import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyTwoFaComponent } from './pages/verify-two-fa/verify-two-fa.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { UserComponent } from './pages/user/user.component';
import { EnableTwoFaComponent } from './pages/enable-two-fa/enable-two-fa.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
  },
  {
    path: 'verify-two-fa',
    component: VerifyTwoFaComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'enable-two-fa',
    component: EnableTwoFaComponent,
  },
];
