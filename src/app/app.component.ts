import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalRService } from './Shared/Services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shoghlana';
  notifications: any[] = [];

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();
    setTimeout(() => {
      this.signalRService.addNotificationListener((data: any) => {
        this.notifications.push(data.message);
      });
    }, 2000);
  }

  ngOnDestroy(): void {
    this.signalRService.startConnection();
  }

  // For testing: Method to manually send a notification
  sendTestNotification(): void {
    this.signalRService.triggerNotification('Test Notification from Angular');
  }
}
