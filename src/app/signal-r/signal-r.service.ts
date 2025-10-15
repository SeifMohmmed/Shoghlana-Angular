import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubConnection: signalR.HubConnection | undefined;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7029/IndividualChatHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connection Started!');
      })
      .catch((err) => console.log('Error While Starting Connection' + err));
  };

  // askServer() {
  //   this.hubConnection?.invoke('askServer', 'hey').catch((err) => {
  //     console.error(err);
  //   });
  // }

  askServerListener() {
    this.hubConnection?.on('askServerResponse', (someText) => {
      console.log(someText);
    });
  }
}
