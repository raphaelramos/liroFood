import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/do';

import { MEAT_API, DOMAIN_API } from '../../app.api';
import { Login } from './login.model';
import { User } from './user.model';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  login: Login;
  user: User;
  lastUrl: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
   private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
                      .subscribe( (e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.login !== undefined || this.cookieService.check('XSRF-TOKEN');
  }

  isUser(): boolean {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    return this.user !== undefined;
  }

  postLogin(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${MEAT_API}/Users/login`,
                          {email: email, password: password})
                    .do(login => this.login = login);
  }

  postLogout(): Observable<Login> {
    return this.http.post<Login>(`${MEAT_API}/Users/logout`, null);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${MEAT_API}/Users/${id}`)
                    .do(user => this.user = user);
  }

  logout() {
    this.postLogout();
    this.user = undefined;

    this.cookieService.delete('XSRF-TOKEN', '/', DOMAIN_API);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }

    this.router.navigate(['/login']);
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)]);
  }

}
