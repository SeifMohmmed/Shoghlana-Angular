import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { Observable } from 'rxjs';
import { IRegisterRequest } from '../Shared/Models/RegisterRequest/IRegisterRequest';
import { ILoginRequest } from '../Shared/Models/LoginRequest/ILoginRequest';
import { UserRoleService } from './user-role.service';
import { GoogleAuthData } from '../Shared/Models/GoogleAuth/GoogleAuthData';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = environment.baseURL;
  constructor(
    private http: HttpClient,
    private userRoleService: UserRoleService
  ) {}

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

  googleAuthentication(
    googleAuthData: GoogleAuthData
  ): Observable<ApiResponse<GoogleAuthData>> {
    googleAuthData.role = this.userRoleService.get();
    return this.http.post<ApiResponse<GoogleAuthData>>(
      this.baseURL + 'Auth/GoogleAuthentication',
      googleAuthData
    );
  }
}
