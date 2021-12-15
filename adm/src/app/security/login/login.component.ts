import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { DOMAIN_API, SSL_API } from './../../app.api';
import { Login } from './login.model';
import { User } from './user.model';

import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;
  session: Login;
  user: User;
  hide = true;

  email     = new FormControl('', [Validators.required, Validators.email]);
  password  = new FormControl('', [Validators.required]);

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private loginService: LoginService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Campo Obrigatório' :
      this.email.hasError('email') ? 'Este email não é válido' :
        '';
  }

  message(message: string) {
    this.snackBar.open(message, '', {
      duration: 2500,
    });
  }

  sessionExpired() {
    if (this.loginService.isUser()) {
      return !this.loginService.isLoggedIn();
    } else {
      return false;
    }
  }

  login() {
    this.loginService.postLogin(this.loginForm.value.email,
      this.loginForm.value.password)
      .subscribe(login =>
        this.session = login,
      response => // HttpErrorResponse
        this.message(response.error.error.message),
      () => {
        const date = new Date();
        const expire: any = new Date(date.setSeconds(date.getSeconds() + this.session.ttl));
        this.cookieService.set('XSRF-TOKEN', this.session.id, expire, '/', DOMAIN_API, <boolean>SSL_API);
        this.loginService.getUser(this.session.userId)

          .subscribe(user =>
            this.user = user,
          response => // HttpErrorResponse
            this.message(response.error.message),
          () => {
            this.message(`Bem vindo ${this.user.username}`);
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('user', JSON.stringify(this.user));
            }
          });
        this.router.navigate([atob(this.navigateTo)]);
      });
  }

}
