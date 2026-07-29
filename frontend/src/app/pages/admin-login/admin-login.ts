import {
  Component,
  inject,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  Router,
  RouterLink,
} from '@angular/router';

import {
  finalize,
} from 'rxjs';

import {
  AuthService,
} from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private readonly authService =
    inject(AuthService);

  private readonly router =
    inject(Router);

  protected username = '';
  protected password = '';

  protected passwordVisible = false;
  protected submitted = false;
  protected loading = false;

  protected errorMessage = '';

  protected togglePasswordVisibility(): void {
    this.passwordVisible =
      !this.passwordVisible;
  }

  protected login(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (
      !this.username.trim() ||
      !this.password.trim()
    ) {
      return;
    }

    this.loading = true;

    this.authService
      .login(
        this.username.trim(),
        this.password,
      )
      .pipe(
        finalize(() =>
          this.loading = false,
        ),
      )
      .subscribe({
        next: () =>
          void this.router.navigate([
            '/admin/dashboard',
          ]),
        error: () => {
          this.errorMessage =
            'Benutzername oder Passwort ist falsch.';
        },
      });
  }
}
