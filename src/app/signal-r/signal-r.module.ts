import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalRRoutingModule } from './signal-r-routing.module';
import { ChatComponent } from './chat/chat.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotificationComponent } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndividualChatComponent } from './individual-chat/individual-chat.component';

@NgModule({
  declarations: [
    ChatComponent,
    JoinRoomComponent,
    WelcomeComponent,
    NotificationComponent,
    IndividualChatComponent,
  ],
  imports: [
    CommonModule,
    SignalRRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [IndividualChatComponent],
})
export class SignalRModule {}
