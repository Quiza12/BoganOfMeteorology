import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationForecast } from '../classes/location-forecast';
import xml2js from 'xml2js';
import * as moment from 'moment';
import { BlobServiceClient } from "@azure/storage-blob";
import { environment } from '../../environments/environment';

const blobServiceClient = new BlobServiceClient('https://mqbomstorageaccount.blob.core.windows.net/bom?');

@Injectable({
  providedIn: 'root'
})
export class BomDataService {

  private nswExtension = "IDN11060.xml";
  private ntExtension = 'IDD10207.xml';
  private qldExtension = 'IDQ11295.xml';
  private saExtension = 'IDS10044.xml';
  private tasExtension = 'IDT16710.xml';
  private vicExtension = 'IDV10753.xml';
  private waExtension = 'IDW14199.xml';

  private nswXml: any;
  private ntXml: any;
  private qldXml: any;
  private saXml: any;
  private tasXml: any;
  private vicXml: any;
  private waXml: any;

  private nswResultsArray = [];
  private ntResultsArray = [];
  private qldResultsArray = [];
  private saResultsArray = [];
  private tasResultsArray = [];
  private vicResultsArray = [];
  private waResultsArray = [];

  private displayDailyForecast: boolean;
  private displayLocationList: boolean;

  private resultsArray = LocationForecast[''];

  constructor(private http: HttpClient) {
    this.displayDailyForecast = false;
    this.displayLocationList = false;
  }

  getNswResultsForDisplay() { return this.nswResultsArray; }
  getNtResultsForDisplay() { return this.ntResultsArray; }
  getQldResultsForDisplay() { return this.qldResultsArray; }
  getSaResultsForDisplay() { return this.saResultsArray; }
  getTasResultsForDisplay() { return this.tasResultsArray; }
  getVicResultsForDisplay() { return this.vicResultsArray; }
  getWaResultsForDisplay() { return this.waResultsArray; }

  getBomData() {
    this.retrieveDataFromAzure(this.nswExtension, this.nswXml, this.nswResultsArray);
    this.retrieveDataFromAzure(this.ntExtension, this.ntXml, this.ntResultsArray);
    this.retrieveDataFromAzure(this.qldExtension, this.qldXml, this.qldResultsArray);
    this.retrieveDataFromAzure(this.saExtension, this.saXml, this.saResultsArray);
    this.retrieveDataFromAzure(this.tasExtension, this.tasXml, this.tasResultsArray);
    this.retrieveDataFromAzure(this.vicExtension, this.vicXml, this.vicResultsArray);
    this.retrieveDataFromAzure(this.waExtension, this.waXml, this.waResultsArray);
  }

  async retrieveDataFromAzure(url: any, xml: string, resultsArray: any) {
    let rawXmlString: any;

    const containerClient = blobServiceClient.getContainerClient("");
    const blobClient = containerClient.getBlobClient(url);

    // Get blob content from position 0 to the end
    // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
    const downloadBlockBlobResponse = await blobClient.download();
    await blobToString(await downloadBlockBlobResponse.blobBody);

    // [Browsers only] A helper method used to convert a browser Blob into string.
    async function blobToString(blob: any) {
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onloadend = (ev) => {
          const eventTarget = fileReader.result;
          resolve(eventTarget);
          rawXmlString = eventTarget;
        };
        fileReader.onerror = reject;
        rawXmlString = fileReader.readAsText(blob);
      });
    }
    var parseString = xml2js.parseString;
    parseString(rawXmlString, (err:any, result:any) => {
        if (err) console.log(err);
        this.loopResults(result, resultsArray);
    });
  }

  loopResults(json: any, resultsArray: any) {
    var areaArray = json.product.forecast[0].area;

    for (var i = 2; i < areaArray.length; i++) {
      if (areaArray[i].$.type != 'public-district') {
        this.getWeeksForecast(areaArray[i], resultsArray);
      }
    }
  }

  getWeeksForecast(areaArray: any, resultsArray: any) {
    let forecastArray = areaArray['forecast-period'];
    for (var i = 0; i < forecastArray.length; i++) {
      let locationForecast = new LocationForecast(
        areaArray.$.description,
        '', '', '', '', '', '', '', '', '', '', ''
      );

      this.getPrettyDate(forecastArray[i].$['start-time-local'], locationForecast);
      this.getAirTempAndPrecipRange(forecastArray[i].element, locationForecast);
      this.getPrecisAndPoP(forecastArray[i].text, locationForecast);

      if (i != 0) { //First day is rest of day's forecast - it's an incomplete one.
        this.getPrettyDate(forecastArray[i].$['start-time-local'], locationForecast);
        this.getAirTempAndPrecipRange(forecastArray[i].element, locationForecast);
        this.getPrecisAndPoP(forecastArray[i].text, locationForecast);
      } else {
        locationForecast.date = 'Forecast for rest of ' + moment(forecastArray[i].$['start-time-local']).format("dddd");
        this.getAirTempAndPrecipRange(forecastArray[i].element, locationForecast);
        this.getPrecisAndPoP(forecastArray[i].text, locationForecast);
      }

      resultsArray.push(locationForecast);
    }
  }

  getPrettyDate(date: any, locationForecast: any) {
    let day = this.getBoganisedDay(moment(date).format("dddd"));
    locationForecast.date = day + ", " + moment(date).format("MMMM D ");
  }

  getBoganisedDay(day: string) {
    switch(day) {
      case "Monday" : return "Mondee"; 
      case "Tuesday" : return "Tuesdee"; 
      case "Wednesday" : return "Wensdee"; 
      case "Thursday" : return "Thursdee"; 
      case "Friday" : return "Fridee"; 
      case "Saturday" : return "Satdee"; 
      case "Sunday" : return "Sundee"; 
      default: return day; 
    }
  }

  getAirTempAndPrecipRange(elementsArray: any, locationForcast: any) {
    //Air temp min and max, as well as precipitation range
    for (var i = 0; i < elementsArray.length; i++)  {
      if (elementsArray[i].$.type != 'forecast_icon_code') {
        if (elementsArray[i].$.type ==  'precipitation_range') {
          locationForcast.precipRange = elementsArray[i]._;
        } else if (elementsArray[i].$.type ==  'air_temperature_minimum') {
          locationForcast.airTempMin = elementsArray[i]._;
        } else if (elementsArray[i].$.type ==  'air_temperature_maximum') {
          locationForcast.airTempMax = elementsArray[i]._;
        }
      }
    }
  }

  getPrecisAndPoP(textArray: any, locationForcast: any) {
    //Precis (concise summary) and probability_of_precipitation
    for (var i = 0; i < textArray.length; i++)  {
      if (textArray[i].$.type ==  'precis') {
        locationForcast.precis = textArray[i]._;
      } else if (textArray[i].$.type ==  'probability_of_precipitation') {
        locationForcast.pop = textArray[i]._;
      }
    }
  }

  getLocationList(stateArray: any) {
    let locationsArray = [];
    for (var i = 0; i < stateArray.length; i++) {
      locationsArray.push(stateArray[i].locationName);
    }

    let tempArray = [];
    tempArray = locationsArray.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });

    return tempArray;
  }

  getDisplayDailyForecastFlag() {
    return this.displayDailyForecast;
  }

  setDisplayDailyForecastFlag(flag: boolean) {
    this.displayDailyForecast = flag;
  }

  getDisplayLocationListFlag() {
    return this.displayLocationList;
  }

  setDisplayLocationListFlag(flag: boolean) {
    this.displayLocationList = flag;
  }

  getForecastForLocation(chosenLocation: any, stateArray: any) {
    this.resultsArray = [];
    for (var i = 0; i < stateArray.length; i++) {
      if (stateArray[i].locationName == chosenLocation) {
        this.resultsArray.push(stateArray[i]);
      }
    }
    return this.resultsArray;
  }

}
