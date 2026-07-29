import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  map,
  Observable,
  tap,
} from 'rxjs';

import { environment } from '../../environments/environment';

interface LoginResponse {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly credentialsKey =
    'portfolio_admin_credentials';

  private readonly usernameKey =
    'portfolio_admin_username';

  login(
    username: string,
    password: string,
  ): Observable<void> {
    return this.http
      .post<LoginResponse>(
        `${environment.apiUrl}/auth/login`,
        {
          username,
          password,
        },
      )
      .pipe(
        tap((response) => {
          sessionStorage.setItem(
            this.credentialsKey,
            btoa(`${username}:${password}`),
          );

          sessionStorage.setItem(
            this.usernameKey,
            response.username,
          );
        }),
        map(() => undefined),
      );
  }

  logout(): void {
    sessionStorage.removeItem(
      this.credentialsKey,
    );

    sessionStorage.removeItem(
      this.usernameKey,
    );

    void this.router.navigate(['/admin']);
  }

  isLoggedIn(): boolean {
    return Boolean(
      sessionStorage.getItem(
        this.credentialsKey,
      ),
    );
  }

  getAuthorizationHeader(): string | null {
    const credentials =
      sessionStorage.getItem(
        this.credentialsKey,
      );

    return credentials
      ? `Basic ${credentials}`
      : null;
  }

  getUsername(): string {
    return (
      sessionStorage.getItem(
        this.usernameKey,
      ) ?? 'Admin'
    );
  }
}
