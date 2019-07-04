import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService,
                private root: Router) { }
    canActivate(): boolean {
        if (this.auth.logedIn()) {
            return true;
        } else {
            this.root.navigate(['/Login']);
            return false;
        }
    }

}

