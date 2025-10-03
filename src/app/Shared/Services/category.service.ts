import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/Response/ApiResponse';
import { ICategory } from '../Models/Category/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<ICategory[]>> {
    return this.http.get<ApiResponse<ICategory[]>>(this.baseURL + 'Category');
  }

  getById(id: number): Observable<ApiResponse<ICategory>> {
    return this.http.get<ApiResponse<ICategory>>(
      this.baseURL + 'Category/' + id
    );
  }

  add(job: any): Observable<ApiResponse<ICategory>> {
    return this.http.post<ApiResponse<ICategory>>(
      this.baseURL + 'Category',
      job
    );
  }

  delete(jobId: number): Observable<ApiResponse<ICategory>> {
    return this.http.delete<ApiResponse<ICategory>>(
      this.baseURL + 'Category/' + jobId
    );
  }

  edit(jobId: number, job: any): Observable<ApiResponse<ICategory>> {
    return this.http.put<ApiResponse<ICategory>>(
      this.baseURL + 'Category' + jobId,
      job
    );
  }
}
