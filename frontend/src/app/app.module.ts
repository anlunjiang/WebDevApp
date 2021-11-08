import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExamsApiService} from "./exams/exams-api.service";

import {ExamFormComponent} from './exams/exam-form.component';
import {ExamsComponent} from './exams/exams.component';

import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from "@angular/material/input";


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
        AppRoutingModule,
        AuthModule.forRoot({
            domain: "dev-uwupyck2.us.auth0.com",
            clientId: "DVsajTPprA8xTLZo5Ohx78cVVTOt6EZP",
        }),
        BrowserModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        ExamsApiService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

