import { Component, OnInit } from '@angular/core';
import {LoadingPageService} from '../loading-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private loadingPageService: LoadingPageService) {
    this.loadingPageService.startLoading();
    setTimeout(function() {
      this.loadingPageService.stopLoading();      //your code to be executed after 1 second
    }, 5000);

   }

  ngOnInit() {
  }

}
