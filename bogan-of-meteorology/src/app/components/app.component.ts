import { Component, OnInit } from '@angular/core';
import { BomDataService } from '../services/bom-data.service';
import { BoganService } from '../services/bogan.service';
import { LocationForecast } from '../classes/location-forecast';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bogan-of-meterology';

  dropdownDefault = 'Where the bloody hell are ya? ⬇'

  nswLocationList = [];
  ntLocationList = [];
  qldLocationList = [];
  saLocationList = [];
  tasLocationList = [];
  vicLocationList = [];
  waLocationList = [];

  chosenLocation: any;
  chosenLocationList = [];

  displayDailyForecast: boolean;
  displayLocationList: boolean;

  stateOption: any;
  resultsArray = LocationForecast[''];

  locationSelectionForm: FormGroup;

  constructor(private bomDataService: BomDataService, private boganService: BoganService, private fb: FormBuilder) {
    this.getDisplayDailyForecastFlag();
    this.getDisplayLocationListFlag();
  }

  ngOnInit() {
    this.setFormToNull();
    this.getBomData();
  }

  setFormToNull() {
    this.locationSelectionForm = this.fb.group({
      locationFormControl: [null]
    });
  }

  subscribeToFormChanges() {
    this.locationSelectionForm.get("locationFormControl").valueChanges
      .subscribe(f => {
        this.chosenLocation = f;
        this.loadSevenDayForecast();
      })
  }

  getBomData() {
    this.bomDataService.getBomData();
    this.subscribeToFormChanges();
  }

  stateOptionChange() {
    this.setFormToNull();

    this.setDisplayLocationListFlag(true);
    this.getDisplayLocationListFlag();

    this.setDisplayDailyForecastFlag(false);
    this.getDisplayDailyForecastFlag();

    this.getAllStateLocationLists();

    switch(this.stateOption) {
      case 'nsw': this.chosenLocationList = this.nswLocationList; break;
      case 'qld': this.chosenLocationList = this.qldLocationList; break;
      case 'nt': this.chosenLocationList = this.ntLocationList; break;
      case 'sa': this.chosenLocationList = this.saLocationList; break;
      case 'tas': this.chosenLocationList = this.tasLocationList; break;
      case 'wa': this.chosenLocationList = this.waLocationList; break;
      case 'vic': this.chosenLocationList = this.vicLocationList; break;
    }
    this.subscribeToFormChanges();
  }

  getAllStateLocationLists() {
    this.nswLocationList = this.bomDataService.getLocationList(this.bomDataService.getNswResultsForDisplay());
    this.qldLocationList = this.bomDataService.getLocationList(this.bomDataService.getQldResultsForDisplay());
    this.ntLocationList = this.bomDataService.getLocationList(this.bomDataService.getNtResultsForDisplay());
    this.saLocationList = this.bomDataService.getLocationList(this.bomDataService.getSaResultsForDisplay());
    this.tasLocationList = this.bomDataService.getLocationList(this.bomDataService.getTasResultsForDisplay());
    this.waLocationList = this.bomDataService.getLocationList(this.bomDataService.getWaResultsForDisplay());
    this.vicLocationList = this.bomDataService.getLocationList(this.bomDataService.getVicResultsForDisplay());
  }

  loadSevenDayForecast() {
    console.log('Retrieving information for location: ' + this.chosenLocation);
    switch(this.stateOption) {
      case 'nsw': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getNswResultsForDisplay())); break;
      case 'qld': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getQldResultsForDisplay())); break;
      case 'nt': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getNtResultsForDisplay())); break;
      case 'sa': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getSaResultsForDisplay())); break;
      case 'tas': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getTasResultsForDisplay())); break;
      case 'wa': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getWaResultsForDisplay())); break;
      case 'vic': this.resultsArray = this.boganise(this.bomDataService.getForecastForLocation(this.chosenLocation, this.bomDataService.getVicResultsForDisplay())) ; break;
    }
    this.setDisplayDailyForecastFlag(true);
    this.getDisplayDailyForecastFlag();
  }

  boganise(resultsArray: any) {
    return this.boganService.boganise(resultsArray);
  }

  getDisplayDailyForecastFlag() {
    this.displayDailyForecast = this.bomDataService.getDisplayDailyForecastFlag();
  }

  setDisplayDailyForecastFlag(flag: boolean) {
    this.bomDataService.setDisplayDailyForecastFlag(flag);
  }

  getDisplayLocationListFlag() {
    this.displayLocationList = this.bomDataService.getDisplayLocationListFlag();
  }

  setDisplayLocationListFlag(flag: boolean) {
    this.bomDataService.setDisplayLocationListFlag(flag);
  }
}
