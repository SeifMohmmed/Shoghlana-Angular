import { Injectable } from '@angular/core';
import { IFreelancer } from '../Shared/Models/Freelancers/IFreelancer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class FreelancersService {
  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IFreelancer[]>> {
    return this.http.get<ApiResponse<IFreelancer[]>>(
      this.baseURL + 'Freelancer'
    );
  }

  getById(id: number): Observable<ApiResponse<IFreelancer>> {
    return this.http.get<ApiResponse<IFreelancer>>(
      this.baseURL + 'Freelancer/' + id
    );
  }

  update(id: number, freelancer: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      this.baseURL + 'Freelancer/' + id,
      freelancer
    );
  }
}
