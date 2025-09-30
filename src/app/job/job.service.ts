import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { IJob } from '../Shared/Models/Job/IJob';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IJob[]>> {
    return this.http.get<ApiResponse<IJob[]>>(this.baseURL + 'Job');
  }

  getPaginatedJobs(
    page: number = 1,
    pageSize: number = 5,
    categoryId: number = 0,
    minBudget: number = 0,
    maxBudget: number = 0,
    clientId: number = 0,
    freelancerId: number = 0,
    includes: string[] | null = null
  ): Observable<ApiResponse<any>> {
    let params = new HttpParams()
      .set('MinBudget', minBudget.toString())
      .set('MaxBudget', maxBudget.toString())
      .set('CategoryId', categoryId.toString())
      .set('ClientId', clientId.toString())
      .set('FreelancerId', freelancerId.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (includes) {
      params = params.set('includes', includes.join(','));
    }

    return this.http.get<any>(this.baseURL + `Job/pagination`, {
      params,
    });
  }

  getById(id: number): Observable<ApiResponse<IJob>> {
    return this.http.get<ApiResponse<IJob>>(this.baseURL + 'Job/' + id);
  }

  getByFreelancerId(id: number): Observable<ApiResponse<IJob>> {
    return this.http.get<ApiResponse<IJob>>(
      this.baseURL + 'Job/freelancer/' + id
    );
  }

  getByClientId(id: number): Observable<ApiResponse<IJob>> {
    return this.http.get<ApiResponse<IJob>>(this.baseURL + 'Job/client/' + id);
  }

  getByCategoryId(id: number): Observable<ApiResponse<IJob>> {
    return this.http.get<ApiResponse<IJob>>(
      this.baseURL + 'Job/category/' + id
    );
  }

  getJobsByCategoryIds(ids: number[]): Observable<ApiResponse<IJob>> {
    let params = new HttpParams();

    ids.forEach((id) => {
      params = params.append('ids', id.toString());
    });

    return this.http.get<ApiResponse<IJob>>(this.baseURL + 'Job/categories', {
      params,
    });
  }

  addJob(job: any): Observable<ApiResponse<IJob>> {
    return this.http.post<ApiResponse<IJob>>(this.baseURL + 'Job', job);
  }

  deleteJob(jobId: number): Observable<ApiResponse<IJob>> {
    return this.http.delete<ApiResponse<IJob>>(this.baseURL + 'Job/' + jobId);
  }

  editJob(jobId: number, job: any): Observable<ApiResponse<IJob>> {
    return this.http.put<ApiResponse<IJob>>(this.baseURL + 'Job' + jobId, job);
  }
}
