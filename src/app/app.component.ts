import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SignalRService } from './Shared/Services/signal-r.service';
import { DarkModeService } from './Shared/Services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shoghlana';
  notifications: any[] = [];
  darkModeService: DarkModeService = inject(DarkModeService);

  constructor(private signalRService: SignalRService) {}

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.addNotificationListener((data: any) => {
      this.notifications.push(data.message);
      console.log('Notification received:', data.message);
    });
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }

  // For testing: Method to manually send a notification
  sendTestNotification(): void {
    this.signalRService.triggerNotification('Test Notification from Angular');
  }
}
