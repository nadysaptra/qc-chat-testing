import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getRole } from './storage/session';

@Injectable({
  providedIn: 'root'
})
export class RoleInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addRoleToken(request));
  }

  addRoleToken(request: HttpRequest<any>) {
    const role = getRole();
    if (role) {
      return request.clone({
        setHeaders: {
          'role': role
        }
      })
    }
    return request
  }
}