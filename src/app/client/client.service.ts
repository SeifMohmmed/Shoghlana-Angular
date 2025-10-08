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

  update(updatedClient: IClient): Observable<ApiResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('Id', updatedClient.id.toString());
    formData.append('Image', updatedClient.image);
    formData.append('Description', updatedClient.description);
    formData.append('Country', updatedClient.country);
    formData.append('Name', updatedClient.name);

    return this.http.put<ApiResponse<any>>(this.baseURL + 'Client', formData);
  }

  updateOverView(Description: string, Id: number) {
    const formData: FormData = new FormData();

    formData.append('Id', Id.toString());
    formData.append('Image', Description);

    return this.http.put(this.baseURL + 'Client', formData);
  }
}
