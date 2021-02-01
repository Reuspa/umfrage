import { DataService } from 'src/app/services/data-service.service';
import { SURVEY } from './../../services/data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  survey: SURVEY
  inputDisabled = false;
  questions = [];

  constructor(
    private router: Router,
    private navController: NavController,
    private route: ActivatedRoute,
    private dataService: DataService,
  )
  {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.survey = this.router.getCurrentNavigation().extras.state.SURVEY;
        this.questions = JSON.parse(this.survey.questions);
        console.log(JSON.stringify(this.questions));
      }
    });
 }

  ngOnInit() {
  }
  back() {
    this.navController.navigateBack('/overview');
  }
  save(){
    this.dataService.addResult(this.survey);
  }
}
