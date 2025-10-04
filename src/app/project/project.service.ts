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
    return this.http.get<ApiResponse<any>>(this.baseURL + 'project');
  }

  getById(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.baseURL + 'project/' + id);
  }

  getByFreelancerId(id: number) {
    console.log(id);
    return this.http.get(this.baseURL + 'project/freelancer/' + id);
  }

  addProject(
    freelancerId: number,
    projectData: FormData
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      this.baseURL + 'project/' + freelancerId,
      projectData
    );
  }

  updateProject(
    freelancerId: number,
    projectData: FormData
  ): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      this.baseURL + 'project/' + freelancerId,
      projectData
    );
  }

  deleteProject(projectId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      this.baseURL + 'project/' + projectId
    );
  }
}
