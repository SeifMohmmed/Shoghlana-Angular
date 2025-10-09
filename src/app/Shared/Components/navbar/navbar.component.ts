import {
  Component,
  HostListener,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { IdentityService } from '../../../identity/identity.service';
import { ChatService } from '../../Services/chat.service';
import { DarkModeService } from '../../Services/dark-mode.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  isOpen: boolean = false;
  messages: any;
  clientId: number | null;
  darkModeService: DarkModeService = inject(DarkModeService);

  constructor(
    private identityService: IdentityService,
    private chatService: ChatService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    //using behavoir subject this code works with every change in dom
    identityService.userData.subscribe({
      next: () => {
        this.isLogged = identityService.userData.getValue() !== null;
      },
    });
  }

  ngOnInit(): void {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('Id');
      this.clientId = id ? Number(id) : null;
      console.log('Client Id from navbar' + this.clientId);
    }
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
