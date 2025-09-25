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
    RouterLink,
    RouterLinkActive,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
