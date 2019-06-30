import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AccesslogComponent } from './accesslog/accesslog.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
{
path: 'login',
component: LoginPageComponent
},
{ 
  path: 'AccessLog', 
component: AccesslogComponent 
},
{ 
  path: 'UserManagement', 
component: UsermanagementComponent
},
{ 
  path: 'RoomManagement', 
component: RoomManagementComponent 
},
{ 
  path: 'Statistics', 
component: StatisticsComponent 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
