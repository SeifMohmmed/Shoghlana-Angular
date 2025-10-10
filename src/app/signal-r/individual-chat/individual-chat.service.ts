import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Shared/Models/User/User';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class IndividualChatService {
  baseURL = environment.baseURL;
  myName: User | undefined;

  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      this.baseURL + `chat/register-user`,
      JSON.stringify(user),
      { headers, responseType: 'text' }
    );
  }
}
