import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ExamsApiService} from './exams-api.service';
import {Exam} from './exam.model';



@Component({
    selector: 'exams',
    templateUrl: './exams.component.html',
})
export class ExamsComponent implements OnInit, OnDestroy {
    examsListSubs: Subscription | undefined;
    examsList: Exam[] | undefined;
    authenticated = false;

    constructor(private examsApi: ExamsApiService) {
    }

    ngOnInit() {
        this.examsListSubs = this.examsApi
            .getExams()
            .subscribe(res => {
                    this.examsList = res;
                },
                console.error
            );
    }

    ngOnDestroy() {
        // @ts-ignore
        this.examsListSubs.unsubscribe();
    }
}
