import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let t = localStorage.getItem('token');
    if (t) {
      let req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${t}`,
        },
      });
      console.log('ADDED TOKEN', req);
      return next.handle(req);
    }
    return next.handle(request);
  }
}
