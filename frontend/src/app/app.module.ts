import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExamsApiService} from "./exams/exams-api.service";

import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';

import {AuthModule, AuthHttpInterceptor, HttpMethod} from '@auth0/auth0-angular';

import {API_URL} from "./env";



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
        })
    ],
    providers: [
        ExamsApiService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

