import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  baseURL = environment.baseURL;
  public connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.baseURL + 'ChatHub')
    .configureLogging(signalR.LogLevel.Information)
    .build();
  public messages$ = new BehaviorSubject<any>([]);
  public connectedUsers$ = new BehaviorSubject<string[]>([]);
  public messages: any[] = [];
  public users: any[] = [];

  constructor() {
    this.start();
    this.connection.on(
      'ReceiveMessage',
      (user: string, message: string, messageTime: string) => {
        this.messages = [...this.messages, { user, message, messageTime }];
        this.messages$.next(this.messages);
      }
    );
    this.connection.on('ConnectedUser', (users: any) => {
      this.connectedUsers$.next(users);
    });
  }

  public async start() {
    try {
      await this.connection.start();
      console.log('Connection is establish');
    } catch (err) {
      console.log(err);
    }
  }

  public async joinRoom(user: string, room: string) {
    return this.connection.invoke('JoinRoom', { user, room });
  }

  public async sendMessage(message: string) {
    return this.connection.invoke('SendMessage', message);
  }

  public async leaveChat() {
    return this.connection.stop();
  }
}
