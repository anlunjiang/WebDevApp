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
        RouterModule.forRoot(appRoutes),
        AuthModule.forRoot({
            domain: "https://dev-uwupyck2.us.auth0.com/",
            clientId: 'DVsajTPprA8xTLZo5Ohx78cVVTOt6EZP',
            redirectUri: 'http://localhost:4200/callback',
            httpInterceptor: {
                allowedList: [
                    // Attach access tokens to any calls to '/api' (exact match)
                    '/exams',

                    // Matching on HTTP method
                    {
                        uri: '/exams',
                        httpMethod: HttpMethod.Post,
                        tokenOptions: {
                            audience: "aj2814-test01",
                            scope: 'openid profile manage:exams',
                        },
                    },
                ],
            },
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

