import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw';

import { MatSnackBar } from '@angular/material';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private injector: Injector,
              private zone: NgZone) {
    super();
  }

  message(message: string) {
    this.injector.get(MatSnackBar).open(message, '', {
      duration: 2500,
    });
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = JSON.parse(errorResponse.error).error.message;
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin();
            this.message(message || 'Faça Login.');
            break;
          case 403:
            this.message(message || 'Não autorizado.');
            break;
          case 404:
            this.message(message || 'Recurso não encontrado. Verifique o console para mais detalhes');
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }
}
