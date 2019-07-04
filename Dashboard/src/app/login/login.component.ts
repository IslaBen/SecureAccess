import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(private auth: AuthService,
                private router: Router) { }
    loginUserInfo = {};
    alertMessage = '';

    ngOnInit() {
    }

    login() {
        this.auth.loginUser(this.loginUserInfo)
            .subscribe(
                res => {
                    this.alertMessage = '';
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/AccessLog']);
                },
                err => {
                    console.log (err);
                    this.alertMessage = err.error;
                }
            );
    }
}
