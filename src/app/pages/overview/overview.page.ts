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
  nichtOffentArray;
  beendetArray;
  laufendArray;
  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.sortSurveys();
  }
  sortSurveys(){
    const Arrays = this.dataService.getData();
    this.nichtOffentArray = Arrays.first;
    this.beendetArray = Arrays.second;
    this.laufendArray = Arrays.third;
    for (const [Key,obj] of Object.entries(Arrays)){
      for (const [name,survey] of Object.entries(obj)){
        const dateNow = Date.now();
        const dateEnd = Date.parse(survey.dateEnd);
        const dateStart = Date.parse(survey.dateStart);
        if ( dateNow > dateEnd){
          this.dataService.beenden(survey);
        }
        if (dateStart < dateNow && dateNow < dateEnd){
          if (survey.status !== "laufend"){
            this.dataService.publish(survey);
          }
          this.dataService.updateSurvey(survey);
        }
      }
    }
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
