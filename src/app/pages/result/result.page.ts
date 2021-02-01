import { SURVEY } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  survey: SURVEY;
  
  constructor(
    private navController: NavController,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    )
    {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.survey = this.router.getCurrentNavigation().extras.state.SURVEY;
          console.log("test");
        }
      });
   }

  ngOnInit() {
  }

}
