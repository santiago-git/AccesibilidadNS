import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceUrl } from '~/app/interfaces';
import { take } from 'rxjs/operators';
import * as appSettings from "tns-core-modules/application-settings";

@Injectable({
  providedIn: 'root'
})
export class ServiceUrlService {

  private servicesUrl: ServiceUrl = {
    urlServices: 'https://accesibilidad-back-end.herokuapp.com/',
    urlSocket: 'https://accesibilidad-back-end.herokuapp.com/'
  }

  constructor(private http: HttpClient) { }

  setUrlLS() {
    const urlService = appSettings.getString('urlService');
    // if (!urlService) {
    //   this.getUrlsFromAssets().subscribe(urls => {
    //     console.log(urls)
    //     appSettings.setString('urlService', urls.urlServices);
    //   })
    // }
  }

  getUrlService() {
    return this.servicesUrl;
    // return appSettings.getString('urlService');
  }

  private getUrlsFromAssets() {
    return this.http.get<ServiceUrl>('assets/config.json').pipe(take(1));
  }

}
