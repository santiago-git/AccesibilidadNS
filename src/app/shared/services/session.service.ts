import { Injectable } from '@angular/core';
import * as appSettings from "tns-core-modules/application-settings";
import { Patient } from '~/app/models';
import { RouterExtensions } from 'nativescript-angular';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private routerExtensions: RouterExtensions) { }

  setSession(patient: Patient) {
    if (patient) {
      try {
        const sessionString = JSON.stringify(patient);
        appSettings.setString('session', sessionString);
      } catch (error) {
        console.log('SessionService', 'No se pudo guardar el usuario')
      }
    }
  }

  getSession(): Patient {
    const sessionString = appSettings.getString('session');
    if (sessionString) {
      try {
        return JSON.parse(sessionString);
      } catch (error) {
        console.log('SessionService', 'No se pudo guardar el usuario')
      }
    }
    return null;
  }

  static isUserLoggedIn(): boolean {
    const sessionString = appSettings.getString('session');
    return sessionString && sessionString !== '';
  }

  login(patient: Patient) {
    if (patient) {
      try {
        const sessionString = JSON.stringify(patient);
        appSettings.setString('session', sessionString);

        if (appSettings.getString('session')) {
          this.routerExtensions.navigate(["/home"], { clearHistory: true });
        }

      } catch (error) {
        console.log('SessionService', 'No se pudo guardar el usuario')
      }
    }
  }

  logOut() {
    this.routerExtensions.navigate(["/login"], { clearHistory: true });
    appSettings.remove('session');
  }

}
