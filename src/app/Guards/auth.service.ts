import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  register(userdata: object): Observable<any> {
    return this.http.post(this.baseURL + 'Register', userdata);
  }

  login(userdata: object): Observable<any> {
    return this.http.post(this.baseURL + 'Token', userdata);
  }

  //getToken():string{
  // return  localStorage.getItem("token")? localStorage.getItem("token"):""
  // }
}
