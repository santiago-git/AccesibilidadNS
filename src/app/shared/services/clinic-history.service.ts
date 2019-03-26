import { Injectable } from '@angular/core';
import { Patient, ClinicHistory } from '~/app/models';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlService } from './service-url.service';
import { SessionService } from './session.service';
import { take, map } from 'rxjs/operators';
import { RequestResult } from '~/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClinicHistoryService {

  urlServices: string;
  patient: Patient;

  constructor(private http: HttpClient,
    private serviceUrlService: ServiceUrlService,
    private sessionService: SessionService) {
    this.urlServices = serviceUrlService.getUrlService().urlServices;
    this.patient = sessionService.getSession();
  }

  get() {
    return this.http.get<RequestResult<ClinicHistory[]>>(this.urlServices + 'clinic-history/getByPatientId/' + this.patient.id).pipe(take(1), map(reqRes => {
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
