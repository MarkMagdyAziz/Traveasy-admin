import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  isFile: Boolean = false
  constructor(private http: HttpClient) { }
  // httpRequestHeaders = new HttpHeaders({
  //   'Content-Type': 'multipart/form-data'
  // });
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    this.isFile = true
    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${environment.BasicURL}upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
        // headers: this.httpRequestHeaders,
      }
    );
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.BasicURL}files`);
  }
  getSingleFile(fileUrl: string): Observable<any> {
    return this.http.get(`${environment.BasicURL}files/${fileUrl}`);
  }
}
