import { Injectable } from '@angular/core';
import { ConstArrays } from './const-arrays.service';

@Injectable({
  providedIn: 'root'
})
export class BoganService {

  pop1 = [];
  pop2 = [];
  pop3 = [];
  pop4 = [];
  pop5 = [];

  temp1 = [];
  temp2 = [];
  temp3 = [];
  temp4 = [];
  temp5 = [];
  temp6 = [];
  temp7 = [];

  precisMap = new Map();

  constructor() {
    this.initialisePopArrays();
    this.initialiseLowHighArrays();
    this.initialisePrecisMap();
  }

  initialisePopArrays() {
    let popArrays = new ConstArrays();
    this.pop1 = popArrays.pop1;
    this.pop2 = popArrays.pop2;
    this.pop3 = popArrays.pop3;
    this.pop4 = popArrays.pop4;
    this.pop5 = popArrays.pop5;
  }

  initialiseLowHighArrays() {
    let tempArrays = new ConstArrays();
    this.temp1 = tempArrays.temp1;
    this.temp2 = tempArrays.temp2;
    this.temp3 = tempArrays.temp3;
    this.temp4 = tempArrays.temp4;
    this.temp5 = tempArrays.temp5;
    this.temp6 = tempArrays.temp6;
    this.temp7 = tempArrays.temp7;
  }

  initialisePrecisMap() {
    let constArrays = new ConstArrays();
    this.precisMap = constArrays.precisMap;
  }

  boganise(resultsList: any) {
    for (var i = 0; i < resultsList.length; i++) {
      resultsList[i].boganisedPop = this.boganisePop(resultsList[i].pop);
      resultsList[i].boganisedAirTempMin = this.boganiseAirTemp(resultsList[i].airTempMin);
      resultsList[i].boganisedAirTempMax = this.boganiseAirTemp(resultsList[i].airTempMax);
      resultsList[i].boganisedPrecis = this.boganisePrecis(resultsList[i].precis);
    }
    return resultsList;
  }

  boganiseAirTemp(airTemp: any) {
    if (airTemp <= 0) {
      return this.getRandomChoice(this.temp1);
    } else if (airTemp > 0 && airTemp <= 7) {
      return this.getRandomChoice(this.temp2);
    } else if (airTemp > 7 && airTemp <= 16) {
      return this.getRandomChoice(this.temp3);
    } else if (airTemp > 16 && airTemp <= 23) {
      return this.getRandomChoice(this.temp4);
    } else if (airTemp > 23 && airTemp <= 30) {
      return this.getRandomChoice(this.temp5);
    } else if (airTemp > 30 && airTemp <= 38) {
      return this.getRandomChoice(this.temp6);
    } else if (airTemp > 38) {
      return this.getRandomChoice(this.temp7);
    }
  }

  boganisePop(pop: any) {
    let replacedPop = pop.replace('%','');
    replacedPop = Number(replacedPop);
    if (replacedPop >= 0 && replacedPop <= 20) {
      return this.getRandomChoice(this.pop1);
    } else if (replacedPop > 21 && replacedPop <= 40) {
      return this.getRandomChoice(this.pop2);
    } else if (replacedPop > 41 && replacedPop <= 60) {
      return this.getRandomChoice(this.pop3);
    } else if (replacedPop > 61 && replacedPop <= 80) {
      return this.getRandomChoice(this.pop4);
    } else if (replacedPop > 81 && replacedPop <= 100) {
      return this.getRandomChoice(this.pop5);
    }
  }

  boganisePrecis(precis: any) {
    var newPrecis = new String;
    newPrecis = precis;
    this.precisMap.forEach((value: string, key: string) => {
      if (precis.toLowerCase().includes(key)) {
        newPrecis = newPrecis.toLowerCase().replace(key, value);
      }
    });
    return this.makeSentenceCase(newPrecis);
  }

  makeSentenceCase(precis: String) {
    var newPrecis = '';
    var splitPrecis = precis.split(".");
      for (var i = 0; i < splitPrecis.length - 1; i++) {
        if (splitPrecis[i].charAt(0) == ' ') {
          newPrecis = newPrecis + ' ' + splitPrecis[i].charAt(1).toUpperCase() + splitPrecis[i].substring(2, splitPrecis[i].length) + '.';
        } else {
          newPrecis = newPrecis + splitPrecis[i].charAt(0).toUpperCase() + splitPrecis[i].substring(1, splitPrecis[i].length) + '.';
        }

      }
    return newPrecis;
  }

  getRandomChoice(array: any) {
    return array[Math.floor(Math.random() * array.length)];
  }

}
