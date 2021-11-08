import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from '../exams-api.service';
import {Exam} from '../exam.model';
import {AuthService} from "@auth0/auth0-angular";

@Component({
    selector: 'exams',
    templateUrl: './exams.component.html',
    styleUrls: ["./exams.component.css"],
})
export class ExamsComponent implements OnInit, OnDestroy {
    examsListSubs: Subscription | undefined;
    examsList: Exam[] | undefined;
    authenticated: boolean = false;
    user: string = "";


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

    delete(examId: number) {
        this.examsApi
            .deleteExam(examId)
            .subscribe(() => {
                this.examsListSubs = this.examsApi
                    .getExams()
                    .subscribe(res => {
                            this.examsList = res;
                        },
                        console.error
                    )
            }, console.error);
    }

    isAdmin() {
        if (!this.authenticated)
            return false;
        return JSON.parse(this.user)["https://localhost/roles"] == "admin";
    }
}
