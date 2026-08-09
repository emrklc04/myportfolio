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
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly tokenKey =
    'portfolio_admin_token';

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
            this.tokenKey,
            response.token,
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
      this.tokenKey,
    );

    sessionStorage.removeItem(
      this.usernameKey,
    );

    void this.router.navigate(['/admin']);
  }

  isLoggedIn(): boolean {
    return this.getValidToken() !== null;
  }

  getAuthorizationHeader(): string | null {
    const token = this.getValidToken();

    return token
      ? `Bearer ${token}`
      : null;
  }

  getUsername(): string {
    return (
      sessionStorage.getItem(
        this.usernameKey,
      ) ?? 'Admin'
    );
  }

  /**
   * Liefert das Token nur, wenn es vorhanden und laut eigener
   * exp-Angabe noch nicht abgelaufen ist. Ein abgelaufenes Token
   * wird verworfen; die endgültige Prüfung bleibt ohnehin das Backend.
   */
  private getValidToken(): string | null {
    const token = sessionStorage.getItem(this.tokenKey);

    if (!token) {
      return null;
    }

    const expiresAt = this.decodeExpiry(token);

    if (expiresAt !== null && expiresAt <= Date.now()) {
      sessionStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.usernameKey);
      return null;
    }

    return token;
  }

  private decodeExpiry(token: string): number | null {
    const payloadSegment = token.split('.')[1];

    if (!payloadSegment) {
      return null;
    }

    try {
      const base64 = payloadSegment
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const padded =
        base64 + '='.repeat((4 - (base64.length % 4)) % 4);

      const payload = JSON.parse(atob(padded)) as {
        exp?: number;
      };

      return payload.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }
}
