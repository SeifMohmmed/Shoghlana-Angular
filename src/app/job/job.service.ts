import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { IJob } from '../Shared/Models/Job/IJob';
import { JobStatus } from '../Shared/Enums/JobStatus/JobStatus';
import { IPaginatedJobsRequestBody } from '../Shared/Models/PaginatedJobs/PaginatedJobsRequestBody';

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
    minBudget: number = 0,
    maxBudget: number = 0,
    clientId: number = 0,
    freelancerId: number = 0,
    hasManyProposals: boolean = false,
    IsNew: boolean = true,
    page: number = 1,
    pageSize: number = 5,
    status: JobStatus = JobStatus.Active,
    requestBody: IPaginatedJobsRequestBody = {
      CategoriesIDs: [],
      Includes: [],
    }
  ): Observable<ApiResponse<any>> {
    let params = new HttpParams()
      .set('MinBudget', (minBudget ?? 0).toString())
      .set('MaxBudget', (maxBudget ?? 0).toString())
      .set('ClientId', (clientId ?? 0).toString())
      .set('FreelancerId', (freelancerId ?? 0).toString())
      .set('HasManyProposals', (hasManyProposals ?? 0).toString())
      .set('IsNew', (IsNew ?? 0).toString())
      .set('page', (page ?? 1).toString())
      .set('pageSize', (pageSize ?? 5).toString())
      .set('status', (status ?? 5).toString());

    return this.http.post<any>(this.baseURL + `Job/pagination`, requestBody, {
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

  searchByJobTitle(keyword: string): Observable<ApiResponse<any>> {
    let params = new HttpParams().set('Keyword', keyword);
    return this.http.get<ApiResponse<any>>(this.baseURL + 'Job/Search', {
      params,
    });
  }
}
