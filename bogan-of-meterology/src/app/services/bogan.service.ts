import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoganService {

  constructor() {}

  boganise(resultsList: any) {

    for (var i = 0; i < resultsList.length; i++) {
      //boganisePop (chance of rain)
      resultsList[i].boganisedPop = this.boganisePop(resultsList[i].pop);
      console.log(resultsList[i].pop + ' - ' + resultsList[i].boganisedPop);
      //boganisePrecis (summary)
    }
    return resultsList;
  }

  boganisePop(pop: any) {
    let replacedPop = pop.replace('%','');
    replacedPop = Number(replacedPop);
    if (replacedPop > 0 && replacedPop <= 20) {
      return 'Set to be an absolute pearler of a day, mate.';
    } else if (replacedPop > 21 && replacedPop <= 40) {
      return 'Might get a sprinkle. She\'ll be right.';
    } else if (replacedPop > 41 && replacedPop <= 60) {
      return 'Take a brolly to be on the safe side.';
    } else if (replacedPop > 61 && replacedPop <= 80) {
      return 'It\'s gonna piss down.';
    } else if (replacedPop > 81 && replacedPop <= 100) {
      return 'Might as well stay in and crack a tin.';
    }
  }


}
