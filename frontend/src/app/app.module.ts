import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExamsApiService} from "./exams/exams-api.service";

import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';

import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";


const appRoutes: Routes = [
    {path: 'new-exam', component: ExamFormComponent},
    {path: '', component: ExamsComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        ExamFormComponent,
        ExamsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        AuthModule.forRoot({
            domain: "dev-uwupyck2.us.auth0.com",
            clientId: "DVsajTPprA8xTLZo5Ohx78cVVTOt6EZP",
        }),
        NoopAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
    ],
    providers: [
        ExamsApiService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

