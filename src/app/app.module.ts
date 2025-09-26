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
import { HighlightDirective } from './Shared/Directives/highlight.directive';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';

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
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
