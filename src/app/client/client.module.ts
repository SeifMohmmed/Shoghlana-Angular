import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

@NgModule({
  declarations: [ClientComponent, ClientProfileComponent],
  imports: [CommonModule, ClientRoutingModule],
  providers: [DatePipe],
})
export class ClientModule {}
