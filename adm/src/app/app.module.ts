import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule,
  MatSnackBarModule, MatInputModule, MatSelectModule,
  MatSlideToggleModule, MatRadioModule, MatDialogModule, MatFormFieldModule
} from '@angular/material';

// App
import { environment } from '../environments/environment';
import { ROUTES } from './app.routing';
import { ApplicationErrorHandler } from './app.error-handler';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';

// Login
import { LoginComponent } from './security/login/login.component';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedin.guard';
import { AuthInterceptor } from './security/auth.interceptor';

// Depedencias de terceiros
import { CookieService } from 'ngx-cookie-service';
import 'hammerjs';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    UpgradeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'lirofood-adm' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    FormsModule, ReactiveFormsModule,

    MatButtonModule, MatCheckboxModule, MatMenuModule,
    MatSnackBarModule, MatInputModule, MatSelectModule,
    MatSlideToggleModule, MatRadioModule, MatDialogModule, MatFormFieldModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: ErrorHandler, useClass: ApplicationErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService, LoginService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
