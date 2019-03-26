import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials, RequestResult } from '~/app/interfaces';
import { take, map } from 'rxjs/operators';
import { ServiceUrlService } from './service-url.service';
import { Patient } from '~/app/models';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private urlServices: string;

  constructor(private http: HttpClient, private serviceUrlService: ServiceUrlService) {
    this.urlServices = serviceUrlService.getUrlService().urlServices;
  }

  login(credentials: Credentials) {
    return this.http.post<RequestResult<Patient>>(this.urlServices + 'patient/login', credentials).pipe(take(1), map(reqRes => {
      return this.resolveResponse(reqRes);
    }));
  }

  private resolveResponse<T>(reqRes: RequestResult<T>) {
    if (!reqRes.successful) {
      console.error('PatientService', reqRes.message);
      throw new Error(reqRes.message);
    }
    return reqRes.result;
  }

}
