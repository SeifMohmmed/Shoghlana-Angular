import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddProjectService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  addProject(projectData: any) {
    return this.http.post(this.baseURL, projectData);
  }
}
