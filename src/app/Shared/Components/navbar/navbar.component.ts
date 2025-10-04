import { Component } from '@angular/core';
import { IdentityService } from '../../../identity/identity.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogged: boolean = false;

  constructor(private identityService: IdentityService) {
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

  logout() {
    this.identityService.logOut();
  }
}
