import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SignalRService } from './signal-r/signal-r.service';
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

    setTimeout(() => {
      this.signalRService.askServerListener();
      //this.signalRService.askServer();
    }, 2000);
  }

  ngOnDestroy(): void {
    this.signalRService.hubConnection?.off('askServerResponse');
  }
}
