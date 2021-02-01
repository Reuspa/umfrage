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
  surveyArray = [
    {
      name: "Umfrage 1",
      description: "Test der Funktionen",
      questions:
        '[{"question":"Ja/Nein Frage","mode":"1","answers":"","answer":false},{"question":"Multi Choice","mode":"2","answers":[{"name":"1111","answer":"false"},{"name":"2222","answer":true},{"name":"3333","answer":"false"},{"name":"4444","answer":true}]},{"question":"Auswahl","mode":"3","answers":[{"name":"1111"},{"name":"2222"},{"name":"3333"},{"name":"444","answer":""},{"name":"555","answer":""}],"answer":"1111"}]',
    },
    {
      name: "Test 2",
      description: "Testen der erstellung der ergebnisse",
      questions:
        '[{"question":"test Frage 1","mode":"1","answers":"","answer":false},{"question":"Multi test","mode":"2","answers":[{"name":"111","answer":false},{"name":"222","answer":false},{"name":"333","answer":true}]},{"question":"Auswahl","mode":"3","answers":[{"name":"111"},{"name":"222"},{"name":"333"}],"answer":"111"}]',
    },
  ];
  result = [
    {
      name: "Test 2",
      description: "Testen der erstellung der ergebnisse",
      questions:
        '[{"question":"test Frage 1","mode":"1","answers":"","answer":false},{"question":"Multi test","mode":"2","answers":[{"name":"111","answer":true},{"name":"222","answer":false},{"name":"333","answer":true}]},{"question":"Auswahl","mode":"3","answers":[{"name":"111"},{"name":"222"},{"name":"333"}],"answer":"222"}]',
    },
    {
      name: "Test 2",
      description: "Testen der erstellung der ergebnisse",
      questions:
        '[{"question":"test Frage 1","mode":"1","answers":"","answer":true},{"question":"Multi test","mode":"2","answers":[{"name":"111","answer":true},{"name":"222","answer":false},{"name":"333","answer":true}]},{"question":"Auswahl","mode":"3","answers":[{"name":"111"},{"name":"222"},{"name":"333"}],"answer":"111"}]',
    },
    {
      name: "Test 2",
      description: "Testen der erstellung der ergebnisse",
      questions:
        '[{"question":"test Frage 1","mode":"1","answers":"","answer":true},{"question":"Multi test","mode":"2","answers":[{"name":"111","answer":true},{"name":"222","answer":false},{"name":"333","answer":true}]},{"question":"Auswahl","mode":"3","answers":[{"name":"111"},{"name":"222"},{"name":"333"}],"answer":"111"}]',
    },
    {
      name: "Test 2",
      description: "Testen der erstellung der ergebnisse",
      questions:
        '[{"question":"test Frage 1","mode":"1","answers":"","answer":true},{"question":"Multi test","mode":"2","answers":[{"name":"111","answer":true},{"name":"222","answer":false},{"name":"333","answer":true}]},{"question":"Auswahl","mode":"3","answers":[{"name":"111"},{"name":"222"},{"name":"333"}],"answer":"111"}]',
    },
  ];
  // result = [];
  constructor() {}

  getData() {
    return this.surveyArray;
  }
  addSurvey(survey) {
    this.surveyArray.push(survey);
  }
  updateSurvey(survey) {
    this.surveyArray.forEach(function (value, index, object) {
      if (value.name === survey.name) {
        object.splice(index, 1);
      }
    });
    this.surveyArray.push(survey);
  }
  addResult(survey) {
    this.result.push(survey);
  }
  getResults(survey) {
    let results = {questions:[]};
    let mode1 = [];
    // let mode1 = { name: '', count: 0, trueCount: 0, falseCount: 0 };
    // let mode2 = {name: '', count: 0, answerCount: {}, };
    // let mode3 = { name: '', count: 0 };
    for (const result of this.result) {
      // let mode1 = { name: '', count: 0, trueCount: 0, falseCount: 0 };
      // console.log('for result: ', result);
      if (result.name === survey.name) {
        let temp = (JSON.parse(result.questions));
        for ( const i of temp){
          // console.log(i);
          switch (i.mode){
            case "1":
              mode1.push(i);
              break;
            case "2":
              break;
            case "3":
              break;
          }
        }
      }
    }
    mode1.forEach( (v) => console.log(v));
    console.log(mode1);
    console.log(results);
  }
  Log() {
    console.log("array", JSON.stringify(this.surveyArray));
    console.log("result", this.result);
  }
  testMode1() {}
}
