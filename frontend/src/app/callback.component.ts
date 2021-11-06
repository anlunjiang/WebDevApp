import {AuthService} from "@auth0/auth0-angular";
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'callback',
    template: `
        <div>Loading authentication details...</div>
    `,
})
export class CallbackComponent implements OnInit {
    authService = AuthService;

    constructor(private router: Router) {
    }


    ngOnInit(): void {
        this.authService.subscribe(err => {
            if (err) alert(err);
            self.router.navigate(['/']);
        }
    }
