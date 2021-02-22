import { Router } from '@angular/router';
import { ResultPage } from './../pages/result/result.page';
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
  archiviert = [];
  user: any = {};


  // Test Arrays 
  // nichtOffentArray = [{"name":"Nicht Veröffentlicht","status":"nichtOffen","description":"Eine nicht veröffentliche Umfrage","dateEnd":"2021-02-20T14:00:14.629+01:00","dateStart":"2021-02-19T12:37:14.628+01:00","questions":"[{\"question\":\"Ja / Nein\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_cevf8kwrt"}];
  // beendetArray = [{"name":"beendete Umfrage","status":"beendet","description":"Eine beendete Umfrage","dateEnd":"2021-02-11T14:00:14.629+01:00","dateStart":"2021-02-10T13:00:14.628+01:00","questions":"[{\"question\":\"Ja / Nein\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_o5yjb70g5"}];
  // laufendArray = [{"name":"Dinnerparty","status":"laufend","description":"Umfrage zur Dinnerparty am 30/02/2021","questions":"[{\"question\":\"Gänge-Auswahl\",\"mode\":\"2\",\"answers\":[{\"name\":\"Vorspeise\",\"answer\":\"false\"},{\"name\":\"Hauptspeise\",\"answer\":\"false\"},{\"name\":\"Dessert\",\"answer\":\"false\"}]},{\"question\":\"Hauptgericht\",\"mode\":\"3\",\"answers\":[{\"name\":\"Fisch\"},{\"name\":\"Rind\"},{\"name\":\"Vegetarisch\",\"answer\":\"\"},{\"name\":\"Vegan\",\"answer\":\"\"}],\"answer\":\"\"},{\"question\":\"Alkohol ?\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_o5yjb70g5","dateEnd":"2021-02-24T15:00:14.629+01:00","dateStart":"2021-02-10T13:00:14.628+01:00"}];
  
  // result = [{"Id":"_o5yjb70g5","Gänge-Auswahl":{"mode":"2","count":0,"Vorspeise":{number:0,percent:0},"Hauptspeise":{number: 0, percent: 0}, "Dessert": {number: 0, percent: 0}}, "Alkohol ?":{"mode":"3","count":0,"Ja":{number:0,percent:0},"Nein":{number:0,percent:0}},"Hauptgericht":{"mode":"3","count":0,"Fisch":{number:0,percent:0},"Rind":{number:0,percent:0},"Vegetarisch":{number:0,percent:0},"Vegan":{number:0,percent:0}}}];
// 
nichtOffentArray = [{"name":"Meeting","description":"Meeting für ein gespräch","dateEnd":"2021-02-17T16:00:00.182+01:00","dateStart":"2021-02-18T15:20:00.181+01:00","status":"nichtOffen","questions":"[{\"question\":\"Online\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"},{\"question\":\"Video\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"},{\"name\":\"Vielleicht\",\"answer\":\"\"}],\"answer\":\"\"},{\"question\":\"hardware\",\"mode\":\"2\",\"answers\":[{\"\":\"false\",\"name\":\"Computer\"},{\"\":\"false\",\"name\":\"Apple\"},{\"\":\"false\",\"name\":\"Mobile\"}]}]","Id":"_eyfi4zd5v"}];
beendetArray = [];
laufendArray = [];

result = [{"Id":"_eyfi4zd5v","Online":{"mode":"3","count":0,"Ja":{"number":0,"percent":0},"Nein":{"number":0,"percent":0}},"Video":{"mode":"3","count":0,"Ja":{"number":0,"percent":0},"Nein":{"number":0,"percent":0},"Vielleicht":{"number":0,"percent":0}},"hardware":{"mode":"2","count":0,"Computer":{"number":0,"percent":0},"Apple":{"number":0,"percent":0},"Mobile":{"number":0,"percent":0}}}];
// 
//


  
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
    this.nichtOffentArray.forEach(function(value, index, object) {
      if (value.Id === survey.Id) {
        object.splice(index, 1);
      }
    });
    this.beendetArray.forEach(function(value, index, object) {
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
    this.laufendArray.push(survey);
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
    this.nichtOffentArray.forEach(function(value, index, object) {
      if (value.Id === survey.Id) {
        object.splice(index, 1);
      }
    });
  }
  archivieren(survey){
    survey.status = 'archiviert';
    this.archiviert.push(survey);
    this.beendetArray.forEach(function(value, index, object) {
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
            temp2[y.name] = {number: 0, percent: 0};
          }
          temp[i.question] = temp2;
        }
        if ( i.mode ==="2"){
          let temp2: any  = {};
          temp2.mode = i.mode;
          temp2.count = 0;
          for ( let y of i.answers){
            temp2[y.name] = {number: 0, percent: 0};
          }
          temp[i.question] = temp2;
        }
      }
      // console.log(temp);
      this.result.push(temp);
  }
  updateResults(survey){
    this.result.forEach(function(value, index, object) {
      if (value.Id === survey.Id) {
        object.splice(index, 1);
      }
    });
    this.createResult(survey);
  }
  addResult(questions){
    for ( const temp of questions){
      if ( temp.mode === "3"){
        this.result.forEach(function (value, index, object){
          if (temp.question in value){
            value[temp.question]['count'] += 1;
            value[temp.question][temp.answer]['number'] += 1;
          }
        });
        for ( const [key, value] of Object.entries(this.result)){
          for ( const [name, item] of Object.entries(value)){
            if ( name !== 'Id'){
             if (item['mode'] === '3'){
              for ( const [question, answer] of Object.entries(item)){
                if (question !== 'mode' && question !== 'count'){
                  answer['percent'] = (answer['number'] / item['count'] * 100).toFixed(2);
                // console.log(`question: ${question}, answer: ${JSON.stringify(answer)}`);
              }
              }
             }
            }
          }
        }
      }
      if ( temp.mode === "2"){
        this.result.forEach(function (value, index, object){
          if (temp.question in value){
            value[temp.question]['count'] += 1;
            for (const i of temp.answers){
              if (i.answer === true){
                // console.log(i.answer);
                // console.log(value[temp.question][i.name]);
                value[temp.question][i.name]['number'] += 1;
              }
            }
           }
        });
        for ( const [key, value] of Object.entries(this.result)){
          for ( const [name, item] of Object.entries(value)){
            if ( name !== 'Id'){
             if (item['mode'] === '2'){
              for ( const [question, answer] of Object.entries(item)){
                if (question !== 'mode' && question !== 'count'){
                  answer['percent'] = (answer['number'] / item['count'] * 100).toFixed(0);
                // console.log(`question: ${question}, answer: ${JSON.stringify(answer)}`);
              }
              }
             }
            }
          }
        }

      }
    }
    // console.log('result', this.result);
  }

  getResults() {
    return this.result;
  }
  Log() {
    console.log(`nicht ${JSON.stringify(this.nichtOffentArray)}, beendet ${JSON.stringify(this.beendetArray)}, laufent ${JSON.stringify(this.laufendArray)}`);

    console.log("result", JSON.stringify(this.result));
  }
}
