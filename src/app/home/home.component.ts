import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IdentityService } from '../identity/identity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  count: number;
  counter: Observable<number>;

  constructor(
    private translateService: TranslateService,
    private store: Store<{ counter: number }>,
    @Inject(PLATFORM_ID) private platformId: Object,
    private identityService: IdentityService
  ) {
    //type of store is generic just as the store i wanna use
    this.counter = this.store.select('counter');
    //  Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('language') || 'en';
      this.translateService.setDefaultLang(lang);
      this.translateService.use(lang);
    } else {
      // Optional: fall back to 'en' on the server
      this.translateService.setDefaultLang('en');
    }
  }

  ngOnInit(): void {
    this.identityService.decodeUserData();
  }
}
