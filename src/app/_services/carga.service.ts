import {Injectable} from '@angular/core';
import {apiEnvironment} from '../_apiConfig/api.config';
import {map} from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http: HttpClient) {

  }

  importExcel(data) {
    return this.http.post<any>(`${apiEnvironment.url}/import/excel`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      })
    );
  }

}
