import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignalRRoutingModule } from './signal-r-routing.module';
import { ChatComponent } from './chat/chat.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotificationComponent } from './notification/notification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndividualChatComponent } from './individual-chat/individual-chat.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    ChatComponent,
    JoinRoomComponent,
    WelcomeComponent,
    NotificationComponent,
    IndividualChatComponent,
    ChatInputComponent,
    MessagesComponent,
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
