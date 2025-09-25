import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  register(form: any) {
    return this.http.post(this.baseURL + 'Account/Register', form);
  }
}
