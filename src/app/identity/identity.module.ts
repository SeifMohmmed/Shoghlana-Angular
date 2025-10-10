import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RoleSelectionPopupComponent } from './role-selection-popup/role-selection-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { SharedModule } from '../Shared/Components/shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RoleSelectionPopupComponent,
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
  exports: [RegisterComponent, LoginComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ Add this line
})
export class IdentityModule {}
