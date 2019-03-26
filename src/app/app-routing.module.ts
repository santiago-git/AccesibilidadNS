import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from './login/login.component';

// import { BackendService } from "./shared/backend.service";
import { HomeModule } from "./home/home.module";
import { SessionService } from "./shared";

const routes: Routes = [
    { path: "", redirectTo: SessionService.isUserLoggedIn() ? "/home" : "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "home", loadChildren: () => HomeModule },
    // { path: "home", loadChildren: "./home.module#HomeModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
