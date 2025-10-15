import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Shared/Models/User/User';
import { environment } from '../../../environments/environment.development';
import { Message } from '../../Shared/Models/Messages/Message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class IndividualChatService {
  baseURL = environment.baseURL;
  myName: User | undefined;
  onlineUsers: string[] = [];
  message: Message[] = [];
  private individualChatConnection?: HubConnection;
  private individualChatService: any;

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      this.baseURL + `chat/register-user`,
      JSON.stringify(user),
      { headers, responseType: 'text' }
    );
  }

  createChatConnection() {
    this.individualChatConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7029/IndividualChatHub')
      .withAutomaticReconnect()
      .build();

    this.individualChatConnection.start().catch((err) => console.log(err));

    this.individualChatConnection.on('UserConnected', () => {
      console.log('the server has called here');
      if (this.myName) {
        this.addUserConnectionId(this.myName);
      }
    });

    this.individualChatConnection.on('OnlineUsers', (OnlineUsers) => {
      this.onlineUsers = [...OnlineUsers];
    });
    this.individualChatConnection.on('NewMessage', (NewMessage: Message) => {
      this.message = [...this.message, NewMessage];
    });
  }

  stopChatConnection() {
    this.individualChatConnection?.stop().catch((err) => console.log(err));
  }

  async addUserConnectionId(name: User) {
    try {
      await this.individualChatConnection?.invoke(
        'AddUserConnectionId',
        name.name
      );
    } catch (error) {
      console.error('Error invoking AddUserConnectionId:', error);
    }
  }
  async sendMessage(content: string) {
    if (!this.myName) {
      throw new Error('User name is not set.');
    }
    const message: Message = {
      from: this.myName.name,
      content: content,
    };
    return this.individualChatConnection?.invoke('ReceiveMessage', message);
  }
}
