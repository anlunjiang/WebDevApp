import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExamsApiService} from "./exams/exams-api.service";

import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';

import * as Auth0 from 'auth0-web';
import { AuthModule } from '@auth0/auth0-angular';

import {CallbackComponent} from './callback.component';

const appRoutes: Routes = [
    {path: 'new-exam', component: ExamFormComponent},
    {path: '', component: ExamsComponent},
    {path: 'callback', component: CallbackComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        ExamFormComponent,
        ExamsComponent,
        CallbackComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ExamsApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        Auth0.configure({
            domain: 'https://dev-uwupyck2.us.auth0.com/',
            audience: 'aj2814-test01',
            clientID: 'DVsajTPprA8xTLZo5Ohx78cVVTOt6EZP',
            redirectUri: 'http://localhost:4200/callback',
            scope: 'openid profile manage:exams'
        });
    }
}
