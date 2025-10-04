import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.baseURL + 'skill');
  }
}
