import { SURVEY } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  survey: SURVEY;
  surveyArray = []
  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.surveyArray = this.dataService.getData();
    // console.log(this.surveyArray);
  }


  addEvent(){
    this.router.navigate(['create']);
  }
  openDetailsWithState(survey) {
    const navigationExtras: NavigationExtras = {
      state: {
        SURVEY : survey,
      }
    };
    this.router.navigate(['create'], navigationExtras);
  }
}
