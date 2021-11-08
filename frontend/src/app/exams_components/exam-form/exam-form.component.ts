import {Component} from '@angular/core';
import {ExamsApiService} from "../exams-api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'exam-form',
    templateUrl: './exam-form.component.html',
    styleUrls: ["./exam-form.component.css"],

})
export class ExamFormComponent {
    exam = {
        title: "",
        description: "",
        long_description: ""
    };

    constructor(private examsApi: ExamsApiService, private router: Router) {
    }

    updateTitle(event: any) {
        this.exam.title = event.target.value;
    }

    updateDescription(event: any) {
        this.exam.description = event.target.value;
    }

    updateLongDescription(event: any) {
        this.exam.long_description = event.target.value;
    }


    saveExam() {
        this.examsApi
            .saveExam(this.exam)
            .subscribe(
                () => this.router.navigate(['/']),
                error => alert(error.message)
            );
    }
}
