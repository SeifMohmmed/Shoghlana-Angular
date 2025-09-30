import { Component, OnDestroy, OnInit } from '@angular/core';
import { SignalRService } from './Shared/Services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Shoghlana';

  constructor() {} //(public signalRService: SignalRService) {}

  ngOnInit(): void {
    // this.signalRService.startConnection();
    // setTimeout(() => {
    //   this.signalRService.askServerListener();
    //   this.signalRService.askServer();
    // }, 2000);
  }

  ngOnDestroy(): void {
    // this.signalRService.hubConnection?.off('askServerResponse');
    // this.signalRService.hubConnection
    //   ?.stop()
    //   .catch((err) => console.error('Error While Stopping Connection: ', err));
  }
}
