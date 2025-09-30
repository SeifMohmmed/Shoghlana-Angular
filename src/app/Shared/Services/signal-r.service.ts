import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { environment } from '../../../environments/environment.development';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  baseURL = environment.baseURL;
  constructor() {}

  hubConnection: signalR.HubConnection | undefined;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseURL + '/notificationHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    this.hubConnection
      .start()
      .then(() => {
        console.log('hub connection started');
      })
      .catch((err) => console.log('error ' + err));
  };
}
