import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from './exams-api.service';
import {Exam} from './exam.model';
import {AuthService} from "@auth0/auth0-angular";

@Component({
    selector: 'exams',
    templateUrl: './exams.component.html',
})
export class ExamsComponent implements OnInit, OnDestroy {
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
}
