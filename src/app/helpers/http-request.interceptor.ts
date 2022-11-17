import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private toastr: ToastrService
  ) {}
  user = this.storageService.getUser();
  userToken = this.user ? this.user.accessToken : null;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'x-access-token': `${this.userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('this is client side error');
          this.toastr.error(`Error: ${error.error.message}`);
        } else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          console.log(error);
          this.toastr.error(`Error: ${error.error.message}`);
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];