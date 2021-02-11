import { Injectable } from "@angular/core";

export interface SURVEY {
  name: string;
  description: string;
  questions?: string;
  Id?: string;
  dateEnd?: any;
  dateStart?: any;
  status?: any;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  survey: SURVEY = {
    name: '',
    description: '',
  };
  archiviert = ""
  nichtOffentArray = [{"name":"Nicht Veröffentlicht","status":"nichtOffen","description":"Eine nicht veröffentliche Umfrage","dateEnd":"2021-02-13T14:00:14.629+01:00","dateStart":"2021-02-11T12:37:14.628+01:00","questions":"[{\"question\":\"Ja / Nein\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_cevf8kwrt"}];
  beendetArray = [{"name":"beendete Umfrage","status":"beendet","description":"Eine beendete Umfrage","dateEnd":"2021-02-13T14:00:14.629+01:00","dateStart":"2021-02-11T13:00:14.628+01:00","questions":"[{\"question\":\"Ja / Nein\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_o5yjb70g5"}];
  laufendArray = [{"name":"Dinnerparty","status":"laufend","description":"Umfrage zur Dinnerparty am 30/02/2021","questions":"[{\"question\":\"Gänge-Auswahl\",\"mode\":\"2\",\"answers\":[{\"name\":\"Vorspeise\",\"answer\":\"false\"},{\"name\":\"Hauptspeise\",\"answer\":\"false\"},{\"name\":\"Dessert\",\"answer\":\"false\"}]},{\"question\":\"Hauptgericht\",\"mode\":\"3\",\"answers\":[{\"name\":\"Fisch\"},{\"name\":\"Rind\"},{\"name\":\"Vegetarisch\",\"answer\":\"\"},{\"name\":\"Vegan\",\"answer\":\"\"}],\"answer\":\"\"},{\"question\":\"Alkohol ?\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_o5yjb70g5","dateEnd":"2021-02-11T15:00:14.629+01:00","dateStart":"2021-02-10T13:00:14.628+01:00"}];
  // surveyArray = [{"name":"Dinnerparty","description":"Umfrage zur Dinnerparty am 30/02/2021","questions":"[{\"question\":\"Gänge-Auswahl\",\"mode\":\"2\",\"answers\":[{\"name\":\"Vorspeise\",\"answer\":\"false\"},{\"name\":\"Hauptspeise\",\"answer\":\"false\"},{\"name\":\"Dessert\",\"answer\":\"false\"}]},{\"question\":\"Hauptgericht\",\"mode\":\"3\",\"answers\":[{\"name\":\"Fisch\"},{\"name\":\"Rind\"},{\"name\":\"Vegetarisch\",\"answer\":\"\"},{\"name\":\"Vegan\",\"answer\":\"\"}],\"answer\":\"\"},{\"question\":\"Alkohol ?\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_o5yjb70g5","lastDate":"2021-02-23T12:33:56.458+01:00"}];

  result = [{"Id":"_o5yjb70g5","Gänge-Auswahl":{"mode":"2","count":0,"Vorspeise":0,"Hauptspeise":0,"Dessert":0},"Alkohol ?":{"mode":"3","Ja":0,"Nein":0},"Hauptgericht":{"mode":"3","count":0,"Fisch":0,"Rind":0,"Vegetarisch":0,"Vegan":0}}];
  user: any = {};
  
  constructor() {}
  getData() {
    return {
      first: this.nichtOffentArray,
      second: this.beendetArray,
      third: this.laufendArray,
    };
  }
  addSurvey(survey) {
    survey.Id = '_' + Math.random().toString(36).substr(2, 9);
    this.nichtOffentArray.push(survey);
  }
  deleteSurvey(survey) {
    this.laufendArray.forEach(function(value, index, object) {
      if (value.Id === survey.Id) {
        object.splice(index, 1);
      }
    });
  }
  updateSurvey(survey) {
    switch (survey.status){
      case 'nichtOffen':
      this.nichtOffentArray.forEach(function (value, index, object) {
        if (value.Id === survey.Id) {
          // console.log(object[index]);
          object[index] = survey;
        }
      });
      break;

      case 'beendet':
      this.beendetArray.forEach(function (value, index, object) {
        if (value.Id === survey.Id) {
          // console.log(object[index]);
          object[index] = survey;
        }
      });
      break;
      case 'laufend':
      this.laufendArray.forEach(function (value, index, object) {
        if (value.Id === survey.Id) {
          // console.log(object[index]);
          object[index] = survey;
        }
      });
      break;
      default:
        console.log("Error in Update Survey");
    }
  }
  publish(survey){
    survey.status = 'laufend';
    this.laufendArray.push(survey)
    this.nichtOffentArray.forEach(function(value, index, object) {
      if (value.Id === survey.Id) {
        object.splice(index, 1);
      }
    });
  }
  beenden(survey){
    survey.status = 'beendet';
    this.beendetArray.push(survey);
    this.laufendArray.forEach(function(value, index, object) {
      if (value.Id === survey.Id) {
        object.splice(index, 1);
      }
    });
  }
  createResult(survey) {
      let temp: any = {};
      temp.Id = survey.Id;
      let tempQuestion = JSON.parse(survey.questions);
      for( let i of tempQuestion){
        if ( i.mode ==="3"){
          let temp2: any  = {};
          temp2.mode = i.mode;
          temp2.count = 0;
          for ( let y of i.answers){
            temp2[y.name] = 0;
          }
          temp[i.question] = temp2;
        }
        if ( i.mode ==="2"){
          let temp2: any  = {};
          temp2.mode = i.mode;
          temp2.count = 0;
          for ( let y of i.answers){
            temp2[y.name] = 0;
          }
          temp[i.question] = temp2;
        }
      }
      console.log(temp);
      this.result.push(temp);
  }
  addResult(questions){
    // console.log("questions", questions);
    for ( const temp of questions){
      if ( temp.mode === "3"){
        this.result.forEach(function (value, index, object){
          if (temp.question in value){
           value[temp.question][temp.answer] += 1;
          }
          // console.log('temp.name:', temp.question);
          // console.log('temp.answer', temp.answer);
        });
      }
      if ( temp.mode === "2"){
        this.result.forEach(function (value, index, object){
          if (temp.question in value){
            for(let i of temp.answers){
              for (const [key, value] of Object.entries(i)) {
                  console.log(`${key}: ${value}`);
                }
            }
            console.log("value", value);
            console.log("temp", temp);
            console.log('value[temp.question][temp.answers] :', value[temp.question][temp.answers]);
           }
          console.log('temp.question:', temp.question);
        });
      }
  }
  }

  getResults() {
    return this.result;
  }
  Log() {
    console.log("array", JSON.stringify(this.laufendArray));
    console.log("result", JSON.stringify(this.result));
    console.log('user: ', this.user);
  }
}
