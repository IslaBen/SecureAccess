import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AccesslogComponent } from './accesslog/accesslog.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {LoginComponent} from './login/login.component';
import {SigninComponent} from './signin/signin.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
    {
        path: 'AccessLog',
        component: AccesslogComponent ,
        canActivate: [AuthGuard]
    },
    {
        path: 'UserManagement',
        component: UsermanagementComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'RoomManagement',
        component: RoomManagementComponent ,
        canActivate: [AuthGuard]
    },
    {
        path: 'Statistics',
        component: StatisticsComponent ,
        canActivate: [AuthGuard]
    },
    {path: 'Login', component: LoginComponent},
    {path: 'Signin', component: SigninComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
