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
  }
  ionViewWillEnter(){
    this.sortSurveys();
  }
  sortSurveys(){
    const Arrays = this.dataService.getData();
    this.nichtOffentArray = Arrays.first;
    this.beendetArray = Arrays.second;
    this.laufendArray = Arrays.third;
    for (const [key,obj] of Object.entries(Arrays)){
      for (const [name,survey] of Object.entries(obj)){
        const dateNow = Date.now();
        const dateEnd = Date.parse(survey.dateEnd);
        const dateStart = Date.parse(survey.dateStart);
        if ( dateNow > dateEnd && dateNow > dateStart){
          console.log('not in range');
          if (survey.status !== 'beendet'){
            console.log('survey closed');
            this.dataService.beenden(survey);
          }
        }
        if (dateStart < dateNow && dateNow < dateEnd){
          console.log('is in range');
          if (survey.status !== "laufend"){
            console.log('is in publish');
            this.dataService.publish(survey);
          }
          // this.dataService.updateSurvey(survey);
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
  log(){
    this.dataService.Log();
  }
}
