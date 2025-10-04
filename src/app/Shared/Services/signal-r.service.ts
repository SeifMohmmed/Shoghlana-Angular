import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  baseURL = 'https://localhost:7029/notificationHub';

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseURL, {
        accessTokenFactory: () => {
          const token = localStorage.getItem('token');
          return token ? token : '';
        },
      })
      .build();
  }

  private hubConnection: signalR.HubConnection;

  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Started'))
      .catch((err) =>
        console.error('Error While Starting SignalR Connection: ', err)
      );
  }

  addNotificationListener(callback: (data: any) => void): void {
    this.hubConnection.on('ReceiveNotification', callback);
  }

  stopConnection(): void {
    this.hubConnection
      .stop()
      .then(() => console.log('SignalR Connection Stopped'))
      .catch((err) =>
        console.error('Error While Stopping SignalrR Connection: ' + err)
      );
  }

  // For testing: Method to manually trigger a notification
  triggerNotification(message: string): void {
    this.hubConnection
      .invoke('SendNotificationToAll', message)
      .catch((err) => console.error(err));
  }
}
