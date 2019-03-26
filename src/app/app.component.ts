import { Component } from "@angular/core";
import { ServiceUrlService } from "./shared";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {

    constructor(private serviceUrlService: ServiceUrlService) {
        serviceUrlService.setUrlLS();
    }
}
