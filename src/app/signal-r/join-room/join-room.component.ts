import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss',
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.joinRoomForm = this.fb.group({
      user: ['', [Validators.required]],
      room: ['', [Validators.required]],
    });
  }

  joinRoom() {
    const { user, room } = this.joinRoomForm.value;
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('room', room);
    this.chatService
      .joinRoom(user, room)
      .then(() => {
        this.router.navigate(['chat']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
