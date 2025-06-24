import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith('http')) {
      return next.handle(request);
    }

    const apiRequest = request.clone({
      url: `${environment.apiUrl}${request.url}`,
    });

    return next.handle(apiRequest);
  }
}
