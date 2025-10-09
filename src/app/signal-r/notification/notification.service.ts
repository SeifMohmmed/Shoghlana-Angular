import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  headers: any = {
    token: localStorage.getItem('token'),
  };

  constructor(private http: HttpClient) {}

  addNotification(clientId: string) {
    return this.http.post(
      `https://route-ecommerce.onrender.com/api/v1/cart`,
      {
        productId: clientId,
      },
      {
        headers: this.headers,
      }
    );
  }
}
