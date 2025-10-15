import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { IRegisterRequest } from '../Shared/Models/RegisterRequest/IRegisterRequest';
import { ILoginRequest } from '../Shared/Models/LoginRequest/ILoginRequest';
import { UserRoleService } from './user-role.service';
import { GoogleAuthData } from '../Shared/Models/GoogleAuth/GoogleAuthData';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseURL = environment.baseURL;
  private email: string = '';
  private roles: string[] = [];
  userData = new BehaviorSubject<GoogleAuthData | null>(null);
  isFreelancer = new BehaviorSubject(null);
  isClient = new BehaviorSubject(null);
  id = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private userRoleService: UserRoleService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token !== null) {
        this.decodeUserData();
        const id: any = localStorage.getItem('Id');
        this.id.next(id);
        if (localStorage.getItem('Role') === 'Freelancer') {
          const role: any = 'Freelancer';
          this.isFreelancer.next(role);
        } else {
          this.isFreelancer.next(null);
        }
        if (localStorage.getItem('Role') === 'Client') {
          const role: any = 'Client';
          this.isClient.next(role);
        } else {
          this.isClient.next(null);
        }
      }
    }
  }

  setEmail(email: string) {
    this.email = email;
  }

  decodeUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const encodedToken = localStorage.getItem('token');
      if (encodedToken) {
        const decodedToken: any = jwtDecode(encodedToken);
        console.log(decodedToken);
        console.log('we have decoded token ', decodedToken);
      } else {
        console.error('Token not found in localStorage');
      }
    }
  }

  forgetPassword(email: string): Observable<ApiResponse<any>> {
    const url = `https://localhost:7029/api/Auth/forgot-password?email=${email}`;
    console.log(email);

    return this.http.post<ApiResponse<any>>(url, {});
  }

  resetPassword(resetForm: any) {
    return this.http.post<ApiResponse<any>>(
      this.baseURL + 'Auth/reset-password',
      { resetForm }
    );
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): string {
    if (localStorage.getItem('Role')) {
      this.roles.push(String(localStorage.getItem('Role')));

      return this.roles[0];
    }
    return 'No Roles';
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

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('Role');
    }
    this.userData.next(null);
    this.router.navigateByUrl('/Account/login');
    this.isClient.next(null);
    this.isFreelancer.next(null);
    this.id.next(null);
    //console.log(this.isClient);
    //console.log(this.userData);
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
    let refreshToken: string | null = null;
    if (isPlatformBrowser(this.platformId)) {
      refreshToken = localStorage.getItem('refreshToken');
    }

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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }
}
