import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlService } from './service-url.service';
import { RequestResult } from '~/app/interfaces';
import { MedicalCenter } from '~/app/models';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicalCenterService {

  urlServices: string;

  constructor(private http: HttpClient, private serviceUrlService: ServiceUrlService) {
    this.urlServices = serviceUrlService.getUrlService().urlServices;
  }

  getAll() {
    return this.http.get<RequestResult<MedicalCenter[]>>(this.urlServices + 'medical-center/getByPatientId').pipe(take(1), map(reqRes => {
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
