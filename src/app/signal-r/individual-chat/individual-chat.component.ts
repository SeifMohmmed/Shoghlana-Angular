import { Component, EventEmitter, Output } from '@angular/core';
import { IndividualChatService } from './individual-chat.service';

@Component({
  selector: 'app-individual-chat',
  templateUrl: './individual-chat.component.html',
  styleUrl: './individual-chat.component.scss',
})
export class IndividualChatComponent {
  @Output() closeChatEmitter = new EventEmitter();

  constructor(public individualChatService: IndividualChatService) {}

  backToHome() {
    this.closeChatEmitter.emit();
  }

  sendMessages(content: string) {
    this.individualChatService.sendMessage(content);
  }
}
