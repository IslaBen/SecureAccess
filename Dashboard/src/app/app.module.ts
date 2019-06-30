import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingPageComponent } from './loading-page/loading-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavbarComponent } from './navbar/navbar.component';
import {MatListModule} from '@angular/material/list';
import { AccesslogComponent } from './accesslog/accesslog.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs'; 
@NgModule({
  declarations: [
    AppComponent,
    LoadingPageComponent,
    LoginPageComponent,
    HomePageComponent,
    NavbarComponent,
    AccesslogComponent,
    UsermanagementComponent,
    RoomManagementComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,  
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
