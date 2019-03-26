import { Component, ElementRef, ViewChild } from "@angular/core";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

import { Credentials } from "../interfaces";
import { PatientService, SessionService } from "../shared";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLoggingIn = true;
    credentials: Credentials = {
        user: "paciente1@gmail.com",
        password: "123456789"
    };
    processing = false;
    @ViewChild("user") user: ElementRef;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    constructor(private page: Page,
        private routerExtensions: RouterExtensions,
        private patientService: PatientService,
        private sessionService: SessionService) {
        this.page.actionBarHidden = true;
        // this.credentials = new Credentials();
        // this.credentials.user = "user@nativescript.org";
        // this.credentials.password = "password";
    }

    toggleForm() {
        // this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.credentials.user || !this.credentials.password) {
            this.alert("Por favor ingresa un usuario y contraseña.");
            return;
        }

        this.processing = true;

        this.patientService.login(this.credentials).subscribe(patient => {
            this.sessionService.login(patient);
            this.processing = false;
            // this.routerExtensions.navigate(["/home"], { clearHistory: true });
        }, err => {
            this.focusUser();
            this.processing = false;
            alert(err);
        });

        // if (this.isLoggingIn) {
        //     this.login();
        // } else {
        //     this.register();
        // }
    }

    // login() {
    //     this.userService.login(this.credentials)
    //         .then(() => {
    //             this.processing = false;
    //             this.routerExtensions.navigate(["/home"], { clearHistory: true });
    //         })
    //         .catch(() => {
    //             this.processing = false;
    //             this.alert("Unfortunately we could not find your account.");
    //         });
    // }

    // register() {
    //     if (this.credentials.password != this.credentials.confirmPassword) {
    //         this.alert("Your passwords do not match.");
    //         return;
    //     }
    //     this.userService.register(this.credentials)
    //         .then(() => {
    //             this.processing = false;
    //             this.alert("Your account was successfully created.");
    //             this.isLoggingIn = true;
    //         })
    //         .catch(() => {
    //             this.processing = false;
    //             this.alert("Unfortunately we were unable to create your account.");
    //         });
    // }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            // if (data.result) {
            //     this.userService.resetPassword(data.text.trim())
            //         .then(() => {
            //             this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
            //         }).catch(() => {
            //             this.alert("Unfortunately, an error occurred resetting your password.");
            //         });
            // }
        });
    }

    focusUser() {
        this.user.nativeElement.focus();
    }
    
    focusPassword() {
        this.password.nativeElement.focus();
    }

    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: "Accesibilidad móvil",
            okButtonText: "Aceptar",
            message: message
        });
    }
}

