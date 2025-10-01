import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injector } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';

export class Refreshtoken implements HttpInterceptor {
  constructor(private inject: Injector, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
}
