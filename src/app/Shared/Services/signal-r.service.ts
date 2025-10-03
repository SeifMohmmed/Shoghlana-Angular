import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  baseURL = 'https://localhost:7029/notificationHub';
  constructor() {}

  hubConnection: signalR.HubConnection | undefined;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseURL, {
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

  askServer() {
    // this.hubConnection
    //   ?.invoke('askServer', 'hey')
    //   .catch((err) => console.error(err));
  }

  askServerListener() {
    this.hubConnection?.on('askServerResponse', (someText) => {
      console.log(someText);
    });
  }
}
