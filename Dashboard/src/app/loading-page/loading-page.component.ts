import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingPageService } from '../loading-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit,OnDestroy {
  
  loading: boolean = false;
  loadingSubscription: Subscription;
  constructor(private loadingPageService : LoadingPageService) { }

  ngOnInit() {
    this.loadingSubscription = this.loadingPageService.loadingStatus.subscribe((value)=>{
      this.loading = value;
    })
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
