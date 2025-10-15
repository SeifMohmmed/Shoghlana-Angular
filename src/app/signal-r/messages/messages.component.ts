import { Component, Input } from '@angular/core';
import { Message } from '../../Shared/Models/Messages/Message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  @Input() messages: Message[] = [];
}
