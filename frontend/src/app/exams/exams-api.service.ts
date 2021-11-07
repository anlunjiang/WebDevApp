// Creates a service that uses HTTPClient to fetch exams from Flask backend app

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {API_URL} from "../env";
import {Exam} from './exam.model';
import {AuthService} from "@auth0/auth0-angular";

@Injectable()
export class ExamsApiService {
    constructor(private http: HttpClient, private auth: AuthService) {
    }

    bearer: string = "";

    private static _handleError(err: HttpErrorResponse | any) {
        return Observable.throw(err.message || "Error: Unable to complete request");
    }

    // GET list of public, future events
    getExams(): Observable<Exam[]> {
        return this.http
            .get<Exam[]>(`${API_URL}/exams`)
            .pipe(catchError(err => {
                return ExamsApiService._handleError(err)
            }));
    }

    saveExam(exam: Exam): Observable<any> {
        this.auth.getAccessTokenWithPopup({
            "audience": "aj2814-test01",
            "scope": "manage:exams"
        }).subscribe(bearer => {
            this.bearer = bearer
        })
        console.log(this.bearer)
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.bearer}`
            })
        };
        return this.http.post(`${API_URL}/exams`, exam, httpOptions);
    }
}

