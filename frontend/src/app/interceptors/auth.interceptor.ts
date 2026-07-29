import {
  inject,
} from '@angular/core';

import {
  HttpInterceptorFn,
} from '@angular/common/http';

import {
  environment,
} from '../../environments/environment';

import {
  AuthService,
} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn =
  (request, next) => {
    const authService = inject(AuthService);

    /*
     * Entfernt einen möglichen Slash am Ende der API-URL.
     *
     * Beispiel:
     * http://localhost:8080/api/
     * wird zu:
     * http://localhost:8080/api
     */
    const apiUrl =
      environment.apiUrl.replace(/\/+$/, '');

    /*
     * OPTIONS-Anfragen werden vom Browser für CORS verwendet.
     * Dafür darf kein Authorization-Header erzwungen werden.
     */
    const isPreflightRequest =
      request.method === 'OPTIONS';

    if (isPreflightRequest) {
      return next(request);
    }

    /*
     * Nur Anfragen an /api/admin oder /api/admin/**
     * benötigen den Authorization-Header.
     */
    const isAdminRequest =
      request.url === `${apiUrl}/admin` ||
      request.url.startsWith(
        `${apiUrl}/admin/`,
      );

    /*
     * Öffentliche Anfragen werden unverändert weitergegeben.
     *
     * Dazu gehören beispielsweise:
     * GET /api/projects
     * GET /api/projects/{slug}
     * POST /api/auth/login
     */
    if (!isAdminRequest) {
      return next(request);
    }

    const authorization =
      authService
        .getAuthorizationHeader()
        ?.trim();

    /*
     * Wenn keine Login-Daten vorhanden sind,
     * wird die Anfrage ohne Header weitergegeben.
     * Das Backend antwortet dann korrekt mit 401.
     */
    if (!authorization) {
      return next(request);
    }

    /*
     * Nur bei geschützten Admin-Anfragen wird
     * der Authorization-Header hinzugefügt.
     */
    const authenticatedRequest =
      request.clone({
        setHeaders: {
          Authorization: authorization,
        },
      });

    return next(authenticatedRequest);
  };
