import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IRegisterRequest } from '../Shared/Models/RegisterRequest/IRegisterRequest';
import { ILoginRequest } from '../Shared/Models/LoginRequest/ILoginRequest';
import { UserRoleService } from './user-role.service';
import { GoogleAuthData } from '../Shared/Models/GoogleAuth/GoogleAuthData';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = environment.baseURL;
  private email: string = '';

  constructor(
    private http: HttpClient,
    private userRoleService: UserRoleService
  ) {}

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

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

  confirmMail(tomail: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      this.baseURL + `Mail/SendConfirmationEmail?tomail=${tomail}`,
      {}
    );
  }

  refreshToken(): Observable<ApiResponse<any>> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    return this.http
      .post<ApiResponse<any>>(this.baseURL + 'Auth/refreshToken', {
        refreshToken,
      })
      .pipe(
        map((res) => {
          if (res.isSuccess && res.token && res.refreshToken) {
            this.storeTokens(res.token, res.refreshToken);
            return res.token;
          } else {
            throw new Error('Failed to refresh token');
          }
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  storeTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
