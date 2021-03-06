import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private router: Router) { }

    private registerUrl = 'http://localhost:3000/Register';
    private loginUrl = 'http://localhost:3000/Login';

    registerUser(user) {
        console.log('hhhhh');
        return this.http.post<any>(this.registerUrl, user);
    }

    loginUser(user) {
        return this.http.post<any>(this.loginUrl, user);
    }


    logoutUser() {
        localStorage.removeItem('token');
        this.router.navigate(['/Login']);
    }

    logedIn() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }
}
