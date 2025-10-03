import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Shared/Models/Response/ApiResponse';
import { IProposal } from '../Shared/Models/Proposal/Proposal';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<IProposal>> {
    return this.http.get<ApiResponse<IProposal>>(this.baseURL + 'Proposal');
  }

  getById(id: number): Observable<ApiResponse<IProposal>> {
    return this.http.get<ApiResponse<IProposal>>(
      this.baseURL + 'Proposal' + id
    );
  }

  postProposal(proposalData: any) {
    return this.http.post(this.baseURL + 'Proposal', proposalData);
  }
}
