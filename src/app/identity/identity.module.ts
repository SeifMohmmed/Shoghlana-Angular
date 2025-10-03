import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RoleSelectionPopupComponent } from './role-selection-popup/role-selection-popup.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RoleSelectionPopupComponent,
  ],
  imports: [CommonModule, IdentityRoutingModule, ReactiveFormsModule],
  exports: [RegisterComponent, LoginComponent],
})
export class IdentityModule {}
