import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, SURVEY } from './../../services/data-service.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  survey: SURVEY = {
    name: '',
    description: '',
  }
  new = true;
  admin = true;
  questionTemp: any = [{question: '', mode: '1', answers: ''}];
  title = 'Neue Umfrage';
  view = "0";
  buttonView = false;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private navController: NavController,
    private DataService: DataService,
    private route: ActivatedRoute,
  )   {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.survey = this.router.getCurrentNavigation().extras.state.SURVEY;
        this.survey = this.getData(this.survey);
        this.questionTemp = JSON.parse(this.survey.questions);
        this.admin = false;
        this.new = false;
        this.title = this.survey.name;
      }
    });
 }

  ngOnInit() {
  }

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.survey.questions = (JSON.stringify(this.questionTemp));
    if (this.new && this.admin) {
      await this.DataService.addSurvey(this.survey);
      console.log("new add");
      this.admin = false;
      if (!this.new){
      this.navController.navigateBack('/overview');
      }
    } else if (!this.new && this.admin){
      await this.DataService.updateSurvey(this.survey);
      console.log("update Survey");
      this.admin = false;
    }else{
      await this.DataService.addResult(this.survey);
      console.log("Added Result");
      this.navController.navigateBack('/overview');
    }
    loading.dismiss();
  }
  getData(survey){
    const surveyArray = this.DataService.getData();
    for (let surveys of surveyArray){
      if ( surveys.name === survey.name){
        // console.log(surveys);
        return surveys
      }
    }
    console.log(surveyArray);
  }

  addQuestion(mode){
    switch (mode){
      case '1': this.questionTemp.push({question: '', mode: '1', answers: ''}); break;
      case '2': this.questionTemp.push({question: '', mode: '2', answers: [{name: '', answer: 'false'}, {name: '', answer: 'false'}, {name: '', answer: 'false'}]}); break;
      case '3': this.questionTemp.push({question: '', mode: '3', answers: [{name: ''}, {name: ''}, {name: ''}], answer: ''}); break;
    }
    // this.questionTemp.push({question:'', mode: '', answers: [{name: '', answer: ''}]});
    // console.log(this.questionTemp);
  }
  addAnswers(idx){
    this.questionTemp[idx].answers.push({name: '', answer: ''});
  }
  removeAnswers(idx, idy){
    console.log(this.questionTemp[idx]);
    this.questionTemp[idx].answers.splice(idy,1);
    console.log(this.questionTemp[idx]);
  }
  removeQuestion(idx){
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Löschen';
    actionSheet.buttons = [{
      text: 'Löschen',
      icon: 'trash',
      cssClass: 'test',

      handler: () => {
        console.log('Added ja/nein');
        this.questionTemp.splice(idx, 1);
      }
    },
    {
      text: 'Abbruch',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }

  viewChange(){
    if(this.view =="0"){
      this.view = "1";
    }else{this.view = "0";}
  }
  adminFlag(){
    this.admin = !this.admin;
  }
  updateSurvey(){
    console.log("update");
    this.survey.questions = (JSON.stringify(this.questionTemp));
    this.DataService.updateSurvey(this.survey);
  }
  async Log(){
    await this.DataService.Log();
  }
  async ResultTest(){
    await this.DataService.getResults(this.survey);
  }
  async actionSheet(){
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Frage Hinzufügen';
    actionSheet.buttons = [{
      text: 'Ja/Nein Frage',
      icon: 'add-circle-outline',
      handler: () => {
        console.log('Added ja/nein');
        this.addQuestion('1');
      }
    }, {
      text: 'Multiply Choice',
      icon: 'add-circle-outline',
      handler: () => {
        console.log('Multiply Choice');
        this.addQuestion('2');
      }
    }, {
      text: 'Auswahl Frage',
      icon: 'add-circle-outline',
      handler: () => {
        console.log('Play clicked');
        this.addQuestion('3');
      }
    },{
      text: 'Abbruch',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
    }
}