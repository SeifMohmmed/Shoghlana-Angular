import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentityModule } from './identity/identity.module';
import { FreelancersModule } from './freelancers/freelancers.module';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { JobModule } from './job/job.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { OffersModule } from './offers/offers.module';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './Store/counter.reducer';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IdentityModule,
    FreelancersModule,
    JobModule,
    OffersModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ counter: counterReducer }),
    CommonModule,
    SocialLoginModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
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
