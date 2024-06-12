import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  private apiUrl = 'http://localhost:8080/app_web_futbol/file/upload'; // URL para subir archivos

  constructor(private http: HttpClient) { }

  uploadFileToS3(file: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.apiUrl, file, httpOptions);
  }

  downloadFile(key: string): Observable<Blob> {
    const httpOptions = {
      responseType: 'blob' as 'json', // Indicamos que esperamos un blob como respuesta
    };


    return this.http.get<Blob>(`http://localhost:8080/app_web_futbol/file/download?key=${key}`, httpOptions);
  }

  downloadFile2(key: string): Observable<string> {
    const httpOptions = {
      responseType: 'blob' as 'json', // Indicamos que esperamos un blob como respuesta
    };

    return this.http.get(`http://localhost:8080/app_web_futbol/file/download?key=${key}`, { ...httpOptions, observe: 'response' })
      .pipe(
        map((res: any) => { 
          const blob = new Blob([res.body], { type: res.headers.get('content-type') }); 
          const fileURL = URL.createObjectURL(blob);
          return fileURL;
        })
      );
  }

}
