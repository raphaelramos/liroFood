import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {LoginService} from './login/login.service';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  header: Object;

  constructor(private injector: Injector, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService);

    if (loginService.isLoggedIn()) {
      if (loginService.login) {
        this.header = {setHeaders: {'Authorization': `${loginService.login.id}`}};
        console.log('Session Login');
      } else {
        this.header = {setHeaders: {'Authorization': `${this.cookieService.get('XSRF-TOKEN')}`}};
      }
      const authRequest = request.clone(this.header);
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }

}
