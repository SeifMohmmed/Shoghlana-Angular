import { Component, HostListener, inject, OnInit } from '@angular/core';
import { IdentityService } from '../../../identity/identity.service';
import { ChatService } from '../../Services/chat.service';
import { DarkModeService } from '../../Services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  isOpen: boolean = false;
  messages: any;
  clientId: number;
  darkModeService: DarkModeService = inject(DarkModeService);

  constructor(
    private identityService: IdentityService,
    private chatService: ChatService
  ) {
    //using behavoir subject this code works with every change in dom
    identityService.userData.subscribe({
      next: () => {
        if (identityService.userData.getValue() !== null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });
  }

  ngOnInit(): void {
    this.clientId = Number(localStorage.getItem('Id'));
    this.chatService.messages$.subscribe((res) => {
      this.messages = res;
      console.log(this.messages);
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }

  logout() {
    this.identityService.logOut();
  }
}
