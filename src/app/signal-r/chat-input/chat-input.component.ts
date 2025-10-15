import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  content: string = '';
  @Output() contentEmitter = new EventEmitter();

  sendMessage() {
    if (this.content.trim() !== '') {
      this.contentEmitter.emit(this.content);
    }
    this.content = '';
  }
}
