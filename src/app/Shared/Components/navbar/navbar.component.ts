import {
  Component,
  HostListener,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { IdentityService } from '../../../identity/identity.service';
import { ChatService } from '../../../signal-r/chat/chat.service';
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
  Id: number | null;
  isFreelancer: boolean = false;
  isClient: boolean = false;
  darkModeService: DarkModeService = inject(DarkModeService);

  constructor(
    private identityService: IdentityService,
    private chatService: ChatService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Only access localStorage in the browser
    // if (isPlatformBrowser(this.platformId)) {
    this.identityService.userData.subscribe({
      next: () => {
        if (this.identityService.userData.getValue() !== null) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      },
    });

    this.identityService.id.subscribe({
      next: () => {
        if (this.identityService.id.getValue() !== null) {
          this.Id = Number(this.identityService.id.getValue());
          console.log('Id From Navbar ' + this.Id);
        }
      },
    });

    this.identityService.isClient.subscribe({
      next: () => {
        if (this.identityService.isClient.getValue() !== null) {
          this.isClient = true;
          console.log(this.identityService.isClient.getValue());
        } else {
          this.isClient = false;
          console.log(this.identityService.isClient.getValue());
        }
      },
    });

    this.identityService.isFreelancer.subscribe({
      next: () => {
        if (this.identityService.isFreelancer.getValue() !== null) {
          this.isFreelancer = true;
          console.log(this.identityService.isFreelancer.getValue());
        } else {
          this.isFreelancer = false;
          console.log(this.identityService.isFreelancer.getValue());
        }
      },
    });

    //   if (localStorage.getItem('Role') === 'Client') {
    //     this.isClient = true;
    //   } else {
    //     this.isFreelancer = true;
    //   }
    // }
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
