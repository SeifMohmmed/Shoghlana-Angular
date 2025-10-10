import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveSuccessWindowComponent } from '../save-success-window/save-success-window.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    SaveSuccessWindowComponent,
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    SaveSuccessWindowComponent,
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
