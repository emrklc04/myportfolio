import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  protected username = '';
  protected password = '';
  protected passwordVisible = false;
  protected submitted = false;

  constructor(private readonly router: Router) {}

  protected togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected openAdminDashboard(): void {
    this.submitted = true;

    if (!this.username.trim() || !this.password.trim()) {
      return;
    }

    /*
     * Hier wird später die Login-Anfrage an das Backend eingebaut.
     *
     * Beispiel:
     * this.authService.login(this.username, this.password)
     */

    void this.router.navigate(['/admin/dashboard']);
  }
}
