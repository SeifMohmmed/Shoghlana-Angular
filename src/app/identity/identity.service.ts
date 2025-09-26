import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { Observable } from 'rxjs';
import { IRegisterRequest } from '../Shared/Models/RegisterRequest/IRegisterRequest';
import { ILoginRequest } from '../Shared/Models/LoginRequest/ILoginRequest';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<ApiResponse<IRegisterRequest>> {
    return this.http.post<ApiResponse<IRegisterRequest>>(
      this.baseURL + 'Auth/Register',
      userData
    );
  }

  login(userData: object): Observable<ApiResponse<ILoginRequest>> {
    return this.http.post<ApiResponse<ILoginRequest>>(
      this.baseURL + 'Auth/Token',
      userData
    );
  }
}
