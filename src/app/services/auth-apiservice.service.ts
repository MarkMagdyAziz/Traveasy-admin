import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICredentials } from './../interfaces/icredentials';
import { IUser } from './../interfaces/iuser';
@Injectable({
  providedIn: 'root',
})
export class AuthAPIServiceService {
  httpOption;
  user: IUser = {} as IUser;
  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  private handleErr(err: HttpErrorResponse) {
    if (err.status)
      alert(`An Error occured ${err.error} ${err.message} ${err.status}`);
    return throwError(() => new Error(`An Error occured  ${err.status}`));
  }
  loggin(credentials: ICredentials): Observable<IUser> {
    return this.http
      .post<IUser>(
        `${environment.BasicURL}auth/signin`,
        JSON.stringify(credentials),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleErr));
  }
}
