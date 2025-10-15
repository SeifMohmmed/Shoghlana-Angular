import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityRoutingModule } from './identity-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RoleSelectionPopupComponent } from './role-selection-popup/role-selection-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { SharedModule } from '../Shared/Components/shared/shared.module';
import { HighlightDirective } from '../Shared/Directives/highlight.directive';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    RoleSelectionPopupComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    HighlightDirective,
  ],
  exports: [RegisterComponent, LoginComponent],
  //schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ Add this line
})
export class IdentityModule {}
