import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { IClient } from '../Shared/Models/Client/Client';
import { IClientJob } from '../Shared/Models/Client/IClient-Job';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IClientJob>> {
    return this.http.get<ApiResponse<IClientJob>>(this.baseURL + 'Job');
  }

  getById(id: number): Observable<ApiResponse<IClientJob>> {
    let searchString = new HttpParams();
    // searchString= searchString.append("projId",id)
    // searchString= searchString.append("limit",5)
    // return this.httpclient.get<any>(`${environment.baseUrl}/Job${id}`,{params:searchString})
    return this.http.get<ApiResponse<IClientJob>>(this.baseURL + 'Job/' + id);
  }

  getByFreelancerId(id: number) {
    console.log(id);
    return this.http.get(this.baseURL + 'Project/freelancer/' + id);
  }
}
