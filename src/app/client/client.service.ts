import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { IClient } from '../Shared/Models/Client/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<ApiResponse<IClient>> {
    return this.http.get<ApiResponse<IClient>>(this.baseURL + 'Client/' + id);
  }
}
