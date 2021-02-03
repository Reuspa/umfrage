import { ResultPage } from './../pages/result/result.page';
import { Injectable } from "@angular/core";

export interface SURVEY {
  name: string;
  description: string;
  questions?: string;
  Id?: string;
  lastDate?: any;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  survey: SURVEY = {
    name: "",
    description: "",
  };
  surveyArray = [{"name":"Dinnerparty","description":"Umfrage zur Dinnerparty am 30/02/2021","questions":"[{\"question\":\"Gang Auswahl \",\"mode\":\"2\",\"answers\":[{\"name\":\"Vorspeise\",\"answer\":\"false\"},{\"name\":\"Hauptspeise\",\"answer\":\"false\"},{\"name\":\"Dessert\",\"answer\":\"false\"}]},{\"question\":\"Hauptgericht\",\"mode\":\"3\",\"answers\":[{\"name\":\"Fisch\"},{\"name\":\"Rind\"},{\"name\":\"Vegetarisch\",\"answer\":\"\"},{\"name\":\"Vegan\",\"answer\":\"\"}],\"answer\":\"\"},{\"question\":\"Alkohol ?\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"}]","Id":"_o5yjb70g5","lastDate":"2021-02-23T12:33:56.458+01:00"}];


  result = [{"Id":"_o5yjb70g5","Gang Auswahl ":{"mode":"2","count":0,"Vorspeise":0,"Hauptspeise":0,"Dessert":0},"Alkohol ?":{"mode":"3","Ja":0,"Nein":0},"Hauptgericht":{"mode":"3","count":0,"Fisch":0,"Rind":0,"Vegetarisch":0,"Vegan":0}}];
  constructor() {}

  getData() {
    return this.surveyArray;
  }
  addSurvey(survey) {
    survey.Id = '_' + Math.random().toString(36).substr(2, 9);
    this.surveyArray.push(survey);
  }
  updateSurvey(survey) {
    this.surveyArray.forEach(function (value, index, object) {
      if (value.Id === survey.Id) {
        console.log(object[index]);
        object[index] = survey;
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
            console.log("value", value);
            console.log("temp", temp);
            console.log('isin :', value[temp.answers]);
           }
          console.log('value:', temp.question);
        });
        
      }
  }
    console.log(this.result);
  }

  getResults() {
    return this.result;
  }
  Log() {
    console.log("array", JSON.stringify(this.surveyArray));
    console.log("result", JSON.stringify(this.result));
  }
  testMode1() {}
}
