import { Injectable } from '@angular/core';
import { ConstArrays } from '../classes/const-arrays';

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

  constructor() {
    this.initialisePopArrays();
    this.initialiseLowHighArrays();
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

  boganise(resultsList: any) {
    for (var i = 0; i < resultsList.length; i++) {
      resultsList[i].boganisedPop = this.boganisePop(resultsList[i].pop);
      resultsList[i].boganisedAirTempMin = this.boganiseAirTemp(resultsList[i].airTempMin);
      resultsList[i].boganisedAirTempMax = this.boganiseAirTemp(resultsList[i].airTempMax);
    }
    return resultsList;
  }

  boganiseAirTemp(airTemp: any) {
    if (airTemp <= 0) {
      return this.getRandomChoice(this.temp1);
    } else if (airTemp > 0 && airTemp <= 7) {
      return this.getRandomChoice(this.temp2);
    } else if (airTemp > 7 && airTemp <= 15) {
      return this.getRandomChoice(this.temp3);
    } else if (airTemp > 15 && airTemp <= 23) {
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

  getRandomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }



}
