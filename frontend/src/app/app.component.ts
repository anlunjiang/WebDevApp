import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from './exams_components/exams-api.service';
import {Exam} from './exams_components/exam.model';

import {AuthService} from "@auth0/auth0-angular";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';
    examsListSubs: Subscription | undefined;
    examsList: Exam[] | undefined;
    authenticated = false;
    user: string | undefined;


    constructor(private examsApi: ExamsApiService, public auth: AuthService) {
    }

    ngOnInit() {
        this.examsListSubs = this.examsApi
            .getExams()
            .subscribe(res => {
                    this.examsList = res;
                },
                console.error
            );
        this.auth.isAuthenticated$.subscribe(authed => this.authenticated = authed);
        this.auth.user$.subscribe(user => this.user = JSON.stringify(user, null, 2));
    }

    ngOnDestroy() {
        // @ts-ignore
        this.examsListSubs.unsubscribe();
    }

    loginWithRedirect(): void {
        // Call this to redirect the user to the login page
        this.auth.loginWithPopup();
    }

    logout(): void {
        // Call this to log the user out of the application
        this.auth.logout({returnTo: 'http://localhost:4200'});
    }
}
