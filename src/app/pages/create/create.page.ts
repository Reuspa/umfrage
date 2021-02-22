
import { LoadingController, NavController, } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService, SURVEY } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  survey: SURVEY = {
    name: '',
    description: '',
    dateEnd: '',
    dateStart: '',
  };

  new = true;
  admin = true;
  questionTemp: any = [
    {
      question: '',
      mode: '3',
      answers: [{ name: 'Ja' }, { name: 'Nein' }],
      answer: '',
    },
  ];
  voteCount;
  percentView = false;
  title = 'Neue Umfrage';
  view = 1;
  buttonView = false;
  finalsResults = {};
  flags = {
    new: true,
    admin: true,
    buttonView: false,
    view: 0,
    nichtOffen: false,
    laufend: false,
    beendet: false,
    editierbar: true,
  };

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private navController: NavController,
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.survey = this.router.getCurrentNavigation().extras.state.SURVEY;
        this.survey = this.getData(this.survey);
        switch (this.survey.status) {
          case 'beendet':
            this.ResultTest();
            this.flags.view = 1;
            this.title = 'Ergebnisse';
            this.flags.new = false;
            this.flags.view = 1;
            this.flags.admin = false;
            break;
          case 'nichtOffen':
            this.flags.admin = true;
            this.flags.new = false;
            break;
          case 'laufend':
            this.flags.admin = true;
            this.flags.new = false;
            break;
        }
        this.questionTemp = JSON.parse(this.survey.questions);
        // this.flags.admin = false;

        this.title = 'Details';
      }
    });
  }

  ngOnInit() {}

  checkForInput(){
    let empty = false;
    for (const [name, obj] of Object.entries(this.questionTemp)) {
      for (const [value, key] of Object.entries(obj)) {
        if ( key === ''){
          if ( value !== 'answer'){
            empty = true;
          }
        }
      }
    }
    if (this.survey.name === '' || this.survey.name === '' || this.survey.dateEnd === '' || empty) {
        return false;
      }else{
        return true;
      }
  }
  checkQuestionsForInput(){
    const empty = false;

    for (const [name, obj] of Object.entries(this.questionTemp)) {
      for (const [value, key] of Object.entries(obj)) {
        if ( value === 'answer'){
          if ( key === ''){
            return false;
          }
        }
      }
    }
    return true;
  }

  async save() {
    if (this.checkForInput()){
      // console.log("save");
      const loading = await this.loadingController.create();
      await loading.present();
      if (this.flags.new && this.flags.admin) {
        this.survey.status = 'nichtOffen';
        this.survey.questions = JSON.stringify(this.questionTemp);
        await this.dataService.addSurvey(this.survey);
        await this.dataService.createResult(this.survey);
        console.log('new add');
        this.flags.new = false;
        this.router.navigate(['overview']);
      } else if (!this.flags.new && this.flags.admin && !this.flags.laufend) {
          this.survey.questions = JSON.stringify(this.questionTemp);
          await this.dataService.updateSurvey(this.survey);
          await this.dataService.updateResults(this.survey);
          console.log('update Survey');
          // this.flags.admin = false;
      } else {
          if( this.checkQuestionsForInput()){
          await this.dataService.addResult(this.questionTemp);
          console.log('Added Result');
          this.dataService.user = { [this.survey.Id]: true };
          this.router.navigate(['overview']);
          }else{
            loading.dismiss();
            const alert = document.createElement('ion-alert');
            alert.header = 'Alert';
            alert.message = 'Es sind nicht alle Fragen beantwortet !';
            alert.buttons = ['OK'];
            document.body.appendChild(alert);
            return alert.present();
          }
      }
      loading.dismiss();
  }else{
    const alert = document.createElement('ion-alert');
    alert.header = 'Alert';
    alert.message = 'Es sind nicht alle Felder ausgefüllt !';
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    return alert.present();
  }
  }
  getData(survey) {
    let surveyArray;
    const Arrays = this.dataService.getData();
    switch (survey.status) {
      case 'nichtOffen':
        this.flags.nichtOffen = true;
        this.flags.beendet = false;
        this.flags.laufend = false;

        surveyArray = Arrays.first;
        for (const surveys of surveyArray) {
          if (surveys.name === survey.name) {
            return surveys;
          }
        }
        break;

      case 'beendet':
        this.flags.beendet = true;
        this.flags.nichtOffen = false;
        this.flags.laufend = false;
        (this.flags.editierbar = false), (surveyArray = Arrays.second);
        for (const surveys of surveyArray) {
          if (surveys.name === survey.name) {
            // console.log(surveys);
            return surveys;
          }
        }
        break;

      case 'laufend':
        this.flags.beendet = false;
        this.flags.nichtOffen = false;
        this.flags.laufend = true;
        (this.flags.editierbar = false), (surveyArray = Arrays.third);
        for (const surveys of surveyArray) {
          if (surveys.name === survey.name) {
            // console.log(surveys);
            return surveys;
          }
        }
        break;

      default:
        return {
          name: 'Empty',
          description: '',
          dateEnd: '',
          questions: '[]',
          Id: '',
        };
    }
  }

  addQuestion(mode) {
    switch (mode) {
      case '1':
        this.questionTemp.push({ question: '', mode: '1', answers: '' });
        break;
      case '2':
        this.questionTemp.push({
          question: '',
          mode: '2',
          answers: [
            { ['']: 'false' },
            { ['']: 'false' },
            { ['']: 'false' },
          ],
        });
        break;
      case '3':
        this.questionTemp.push({
          question: '',
          mode: '3',
          answers: [{ name: 'Ja' }, { name: 'Nein' }],
          answer: '',
        });
        break;
    }
  }
  addAnswers(idx) {
    this.questionTemp[idx].answers.push({ name: '', answer: '' });
  }
  removeAnswers(idx) {
    if (this.questionTemp[idx].answers.length > 2) {
      this.questionTemp[idx].answers.pop();
    } else {
      console.log('mindest Anzahl an fragen erreicht');
    }
  }
  async viewChange() {
    if (this.view === 0) {
      await this.ResultTest();
      this.view = 1;
      this.title = 'Ergebnisse';
    } else {
      this.view = 0;
      this.title = 'Details';
    }
  }
  adminFlag() {
    this.flags.admin = !this.flags.admin;
  }
  updateSurvey() {
    console.log('Update');
    this.survey.questions = JSON.stringify(this.questionTemp);
    this.dataService.updateSurvey(this.survey);
  }
  async archivieren(){
    await this.dataService.archivieren(this.survey);
    this.router.navigate(['overview']);
  }

  async ResultTest() {
    const results = await this.dataService.getResults();
    for (const temp of results) {
      if (temp.Id === this.survey.Id) {
        for (const [name, obj] of Object.entries(temp)) {
          const tempObj: any = [];
          if (name !== 'Id') {
            for (const [key, value] of Object.entries(obj)) {

              if (key !== 'mode' && key !== 'count') {
                if(obj['mode']=== '2'){
                  tempObj.push({ key, value });
                }
                if(obj['mode']=== '3'){
                  tempObj.push({ key, value });
                }
              }
              if (key === 'count') {
                this.voteCount = value;
              }
            }
            // Sort finalsResults most votes to least
            tempObj.sort((a,b) => (a.value.number > b.value.number) ? -1 : ((b.value.number > a.value.number) ? 1 : 0));
            this.finalsResults[name] = tempObj;
            // console.log('finaleResult', this.finalsResults);
          }
        }
      }
    }
  }

  logOut() {
    this.dataService.Log();
  }
  logFlags(){
    console.log(this.flags);
  }

  openDetailsWithState(survey) {
    const navigationExtras: NavigationExtras = {
      state: {
        SURVEY: survey,
      },
    };
    this.router.navigate(['create'], navigationExtras);
  }
  //  ACTION SHEETS
  deleteSurvey() {
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Löschen';
    actionSheet.buttons = [
      {
        text: 'Löschen',
        icon: 'trash',
        cssClass: 'test',

        handler: () => {
          console.log('Added ja/nein');
          this.dataService.deleteSurvey(this.survey);
          this.navController.navigateBack('/overview');
        },
      },
      {
        text: 'Abbruch',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }
  async fragenArtAuswahl() {
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Frage Hinzufügen';
    actionSheet.buttons = [
      {
        text: 'Einfache Auswahl',
        icon: 'add-circle-outline',
        handler: () => {
          console.log('Play clicked');
          this.addQuestion('3');
        },
      },
      {
        text: 'Mehrfache Auswahl',
        icon: 'add-circle-outline',
        handler: () => {
          console.log('Multiply Choice');
          this.addQuestion('2');
        },
      },
      {
        text: 'Abbruch',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }
  beenden() {
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Beenden';
    actionSheet.buttons = [
      {
        text: 'Jetzt Beenden',
        icon: 'alert',
        cssClass: 'test',

        handler: () => {
          console.log('Umfrage beendet');
          let d = new Date()
          this.survey.dateEnd = d.toString();
          this.dataService.beenden(this.survey);
          this.navController.navigateBack('/overview');
        },
      },
      {
        text: 'Abbruch',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }
  publish() {
    const actionSheet = document.createElement('ion-action-sheet');

    actionSheet.header = 'Veröffentlichen';
    actionSheet.buttons = [
      {
        text: 'Jetzt Veröffentlichen',
        icon: 'checkmark',
        cssClass: 'test',

        handler: () => {
          let d = new Date()
          this.survey.dateStart = d.toString();
          console.log('Veröffentlichen');
          this.save();
          this.dataService.publish(this.survey);
          this.navController.navigateBack('/overview');
        },
      },
      {
        text: 'Abbruch',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }
  removeQuestion(idx) {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Löschen';
    actionSheet.buttons = [
      {
        text: 'Löschen',
        icon: 'trash',
        cssClass: 'test',

        handler: () => {
          console.log('Added ja/nein');
          this.questionTemp.splice(idx, 1);
        },
      },
      {
        text: 'Abbruch',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
    document.body.appendChild(actionSheet);
    return actionSheet.present();
  }
}
