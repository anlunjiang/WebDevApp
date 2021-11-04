import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExamsApiService} from "./exams/exams-api.service";

import {ExamFormComponent} from './exams/exam-form.component';
import {RouterModule, Routes} from '@angular/router';
import {ExamsComponent} from './exams/exams.component';

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
        RouterModule.forRoot(appRoutes)
    ],
    providers: [ExamsApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
