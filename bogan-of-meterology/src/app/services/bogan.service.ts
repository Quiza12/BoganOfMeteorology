import { Injectable } from '@angular/core';
import { PopArrays } from '../classes/pop-arrays';
import { LowHighArrays } from '../classes/low-high';

@Injectable({
  providedIn: 'root'
})
export class BoganService {

  pop1 = [];
  pop2 = [];
  pop3 = [];
  pop4 = [];
  pop5 = [];

  low = [];
  high = [];

  constructor() {
    this.initialisePopArrays();
    this.initialiseLowHighArrays();
  }

  initialisePopArrays() {
    let popArrays = new PopArrays();
    this.pop1 = popArrays.pop1;
    this.pop2 = popArrays.pop2;
    this.pop3 = popArrays.pop3;
    this.pop4 = popArrays.pop4;
    this.pop5 = popArrays.pop5;
  }

  initialiseLowHighArrays() {
    let lowHighArrays = new LowHighArrays();
    // this.low = lowHighArrays.low;
    // this.high = lowHighArrays.high;
  }

  boganise(resultsList: any) {
    for (var i = 0; i < resultsList.length; i++) {
      resultsList[i].boganisedPop = this.boganisePop(resultsList[i].pop);
      //precis
      //low - "{Low}. - Bit nippy etc..."
      //high - "{High}. - Bit nippy etc..."
    }
    return resultsList;
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
