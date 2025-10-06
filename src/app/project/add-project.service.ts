import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class AddProjectService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  addProject(projectData: any): Observable<ApiResponse<any>> {
    projectData.CategoryId = Number(projectData.categoryId);
    projectData.experienceLevel = Number(projectData.experienceLevel);

    return this.http.post<ApiResponse<any>>(this.baseURL, projectData);
  }
}
