import { ResultPage } from './../pages/result/result.page';
import { Injectable } from "@angular/core";

export interface SURVEY {
  name: string;
  description: string;
  questions?: string;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  survey: SURVEY = {
    name: "",
    description: "",
  };
  surveyArray = [{"name":"Dinnerparty","description":"sdasd","questions":"[{\"question\":\"Trinken\",\"mode\":\"3\",\"answers\":[{\"name\":\"Ja\"},{\"name\":\"Nein\"}],\"answer\":\"\"},{\"question\":\"Essen?\",\"mode\":\"2\",\"answers\":[{\"name\":\"vor\",\"answer\":\"false\"},{\"name\":\"Haupt\",\"answer\":\"false\"},{\"name\":\"dessert\",\"answer\":\"false\"}]}]","Id":"_35vmdm2uh"}]


  result = [{"Id":"_35vmdm2uh","Trinken":{"mode":"3","Ja":0,"Nein":0},"Essen?":{"mode":"2","vor":0,"Haupt":0,"dessert":0}}];
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
  }
    console.log(this.result);
  }

  getResults(survey) {

  }
  Log() {
    console.log("array", JSON.stringify(this.surveyArray));
    console.log("result", JSON.stringify(this.result));
  }
  testMode1() {}
}
