import { NgModule } from "@angular/core";
import { Http, BaseRequestOptions } from "@angular/http";
import { MdNativeDateModule } from "@angular/material";
import { MockBackend } from "@angular/http/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule, NG_VALIDATORS, AbstractControl, ValidationErrors } from "@angular/forms";
import { NgbDatepickerModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";

import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormsBasicUIModule } from "@ng2-dynamic-forms/ui-basic";
import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";
import { DynamicFormsFoundationUIModule } from "@ng2-dynamic-forms/ui-foundation";
import { DynamicFormsKendoUIModule } from "@ng2-dynamic-forms/ui-kendo";
import { DynamicFormsMaterialUIModule } from "@ng2-dynamic-forms/ui-material";
import { DynamicFormsNGBootstrapUIModule } from "@ng2-dynamic-forms/ui-ng-bootstrap";
import { DynamicFormsPrimeNGUIModule } from "@ng2-dynamic-forms/ui-primeng";

import { BasicExampleComponent } from "./basic/basic-example.component";
import { BootstrapExampleComponent } from "./bootstrap/bootstrap-example.component";
import { FoundationExampleComponent } from "./foundation/foundation-example.component";
import { KendoExampleComponent } from "./kendo/kendo-example.component";
import { MaterialExampleComponent } from "./material/material-example.component";
import { NGBootstrapExampleComponent } from "./ng-bootstrap/ng-bootstrap-example.component";
import { PrimeNGExampleComponent } from "./primeng/primeng-example.component";

import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AppValidators } from "./app.validators";

export function mockBackendFactory(mockBackend: MockBackend, baseRequestOptions: BaseRequestOptions) {
    return new Http(mockBackend, baseRequestOptions);
}

@NgModule({

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MdNativeDateModule,
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule,
        DynamicFormsBootstrapUIModule,
        DynamicFormsFoundationUIModule,
        DynamicFormsKendoUIModule,
        DynamicFormsMaterialUIModule,
        DynamicFormsNGBootstrapUIModule,
        DynamicFormsPrimeNGUIModule
    ],
    declarations: [
        BasicExampleComponent,
        BootstrapExampleComponent,
        FoundationExampleComponent,
        KendoExampleComponent,
        MaterialExampleComponent,
        NGBootstrapExampleComponent,
        PrimeNGExampleComponent,
        ValidationMessageComponent,
        AppComponent
    ],
    providers: [
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: mockBackendFactory
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: NG_VALIDATORS,
            useValue: AppValidators.customValidator,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}