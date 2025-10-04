import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';
import { authGuard } from '../Guards/auth.guard';

const routes: Routes = [
  {
    path: 'joinRoom',
    component: JoinRoomComponent,
    canActivate: [authGuard],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalRRoutingModule {}
