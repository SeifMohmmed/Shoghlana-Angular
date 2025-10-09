import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentityModule } from './identity/identity.module';
import { FreelancersModule } from './freelancers/freelancers.module';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { JobModule } from './job/job.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { OffersModule } from './offers/offers.module';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './Store/counter.reducer';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './Shared/Components/shared/shared.module';

// Factory function for the TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Feature Modules
    IdentityModule,
    FreelancersModule,
    JobModule,
    OffersModule,
    SharedModule,

    // Core Angular Modules
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,

    //Router
    RouterLink,
    RouterLinkActive,

    // Toastr Notifications
    ToastrModule.forRoot(),

    // NGRX Store
    StoreModule.forRoot({ counter: counterReducer }),

    // Social Login
    SocialLoginModule,

    // Translations
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // Google Auth Config
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1679541546-jcmb01tm980bmijbjth4e3v7hp1bto31.apps.googleusercontent.com',
              {
                oneTapEnabled: false,
                prompt: 'consent',
              }
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],

  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
