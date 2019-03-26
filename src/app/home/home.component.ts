import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SessionService, MedicalEmergencyService } from "../shared";
import { Patient, MedicalEmergency } from "../models";
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch, Location } from "nativescript-geolocation";

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    message = 'Aquí podras reportar una emergencia en caso de accidentalidad';
    session: Patient;
    processing = false;
    myLocation: Location;
    medicalEmergency: MedicalEmergency;
    @ViewChild("patient_description") patient_description: ElementRef;

    constructor(private sessionService: SessionService,
        private medicalEmergencyService: MedicalEmergencyService) {
        this.session = sessionService.getSession();
        this.medicalEmergency = new MedicalEmergency(this.session.id, '', 0, 0);
        this.enableLocation();
        // this.getLocation();
    }

    ngOnInit(): void { }

    enableLocation() {
        // geolocation.isEnabled().then(function (isEnabled) {
        //     if (!isEnabled) {
        //         geolocation.enableLocationRequest().then(function () {
        //         }, function (e) {
        //             console.log("Error: " + (e.message || e));
        //         });
        //     }
        // }, function (e) {
        //     console.log("Error: " + (e.message || e));
        // });
    }

    getLocation() {
        if (this.myLocation) {
            return Promise.resolve(this.myLocation);
        }

        return getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
            then(location => {
                if (location) {
                    this.myLocation = location;
                    return location;
                }
            });
    }

    createMedicalEmergency() {

        //validaciones

        if (!this.medicalEmergency.patient_description || this.medicalEmergency.patient_description.trim() === '') {
            this.alert('Debes ingresar una descipción válida');
            this.patient_description.nativeElement.focus();
            return;
        }

        this.processing = true;

        this.getLocation().then(coords => {

            this.medicalEmergency.coordLat = coords.latitude;
            this.medicalEmergency.coordLong = coords.longitude;

            this.medicalEmergencyService.save(this.medicalEmergency).subscribe(medicalEmergency => {
                this.alert('La emergencia se ha reportado satisfactoriamente');
                this.processing = false;
            }, err => {
                this.processing = false;
                alert(err);
            });
        });



    }

    logout() {
        this.sessionService.logOut();
    }

    alert(message: string) {
        return alert({
            title: "Accesibilidad móvil",
            okButtonText: "Aceptar",
            message: message
        });
    }
}
