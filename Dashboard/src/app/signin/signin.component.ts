import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    constructor(private auth: AuthService,
                private router: Router) { }
    registerUserInfo = {};
    ngOnInit() {
    }

    registerUser() {
        this.auth.registerUser(this.registerUserInfo)
            .subscribe(
                res => {
                    console.log (res);
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/AccessLog']);
                },
                err => console.log (err)
            );
    }
}
