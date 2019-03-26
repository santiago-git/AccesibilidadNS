import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrlService } from './service-url.service';
import { MedicalEmergency, Patient } from '~/app/models';
import { RequestResult } from '~/app/interfaces';
import { take, map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MedicalEmergencyService {

  private urlServices: string;
  private patient: Patient;

  constructor(private http: HttpClient,
    private serviceUrlService: ServiceUrlService,
    private sessionService: SessionService) {
    this.urlServices = serviceUrlService.getUrlService().urlServices;
    this.patient = sessionService.getSession();
  }

  save(medicalEmergency: MedicalEmergency) {
    return this.http.post<RequestResult<MedicalEmergency>>(this.urlServices + 'medical-emergency/save', medicalEmergency).pipe(take(1), map(reqRes => {
      return this.resolveResponse(reqRes);
    }));
  }

  getByPatientId() {
    return this.http.get<RequestResult<MedicalEmergency[]>>(this.urlServices + 'medical-emergency/getByPatientId/' + this.patient.id).pipe(take(1), map(reqRes => {
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
