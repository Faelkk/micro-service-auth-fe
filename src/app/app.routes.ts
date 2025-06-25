import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyTwoFaComponent } from './pages/verify-two-fa/verify-two-fa.component';
import { SigninComponent } from './pages/signin/signin.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { UserComponent } from './pages/user/user.component';
import { EnableTwoFaComponent } from './pages/enable-two-fa/enable-two-fa.component';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'verify-two-fa',
    component: VerifyTwoFaComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'enable-two-fa',
    component: EnableTwoFaComponent,
    canActivate: [AuthGuard],
  },
];
