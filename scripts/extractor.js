const request = require('request');
const parseString = require('xml2js').parseString;
const util = require('util');
const moment = require('moment');
const apiEndpoint = 'http://www.bom.gov.au/fwo/';

const nswExtension = 'IDN11060.xml';
const ntExtension = 'IDD10207.xml';
const qldExtension = 'IDQ11295.xml';
const saExtension = 'IDS10044.xml';
const tasExtension = 'IDT16710.xml';
const vicExtension = 'IDV10753.xml';
const waExtension = 'IDW14199.xml';

var objectArray = [];

//node extractor.js {state} {location}
//First: node extractor.js {location} - DONE
//Second: node extractor.js {state} - DONE

var arguments = process.argv.slice(2);
var stateArg = arguments[0];
var locationArg = arguments[1].toLowerCase();

switch (stateArg){
  case 'nsw':
    extract(apiEndpoint + nswExtension); //NSW
    break;
  case 'qld':
    extract(apiEndpoint + qldExtension); //QLD
    break;
  case 'nt':
    extract(apiEndpoint + ntExtension); //NT
    break;
  case 'sa':
    extract(apiEndpoint + saExtension); //SA
    break;
  case 'vic':
    extract(apiEndpoint + vicExtension); //VIC
    break;
  case 'wa':
    extract(apiEndpoint + waExtension); //WA
    break;
  case 'tas':
    extract(apiEndpoint + tasExtension); //TAS
    break;
  default:
    console.log('Enter state as an argument (nsw/qld/sa/nt/vic/wa/tas)');
}

function extract(url) {
  var options = { url: url, headers: { 'User-Agent': 'request' }};

  function callback(error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    extractXml(body);
  }
  request(options, callback);
}

function extractXml(data) {
  parseString(data, function (err, result) {
      loopResults(result);
  });
}

function loopResults(json) {
  var areaArray = json.product.forecast[0].area;

  for (var i = 2; i < areaArray.length; i++) {
  //for (var i = 2; i < 5; i++) {
    if (areaArray[i].$.type != 'public-district') {

      getWeeksForecast(areaArray[i]);
      // console.log(areaArray[i]['forecast-period']);
    }
  }
  printEntireForecast();
}

function getWeeksForecast(areaArray) {
  forecastArray = areaArray['forecast-period'];
  for (var i = 0; i < forecastArray.length; i++) {
    var locationForcast = new Object({});

    locationForcast.locationName = areaArray.$.description;
    locationForcast.date = '';
    locationForcast.precis = '';
    locationForcast.pop = '';
    locationForcast.airTempMin = '';
    locationForcast.airTempMax = '';
    locationForcast.precipRange = '';

    getPrettyDate(forecastArray[i].$['start-time-local'], locationForcast);
    getAirTempAndPrecipRange(forecastArray[i].element, locationForcast);
    getPrecisAndPoP(forecastArray[i].text, locationForcast);

    objectArray.push(locationForcast);
  }
}

function getAirTempAndPrecipRange(elementsArray, locationForcast) {
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

function getPrecisAndPoP(textArray, locationForcast) {
  //Precis (concise summary) and probability_of_precipitation
  for (var i = 0; i < textArray.length; i++)  {
    if (textArray[i].$.type ==  'precis') {
      locationForcast.precis = textArray[i]._;
    } else if (textArray[i].$.type ==  'probability_of_precipitation') {
      locationForcast.pop = textArray[i]._;
    }
  }
}

function getPrettyDate(date, locationForcast) {
  locationForcast.date = moment(date).format("dddd, D MMMM");
}

function printEntireForecast() {
  //console.log(locationArg);
  if (locationArg == null) {
    for (var i = 0; i < (objectArray.length - 1); i++)  {
      printForecast(objectArray[i]);
    }
  } else {
    for (var j = 0; j < (objectArray.length - 1); j++)  {
      if (objectArray[j].locationName.toLowerCase() == locationArg) {
        printForecast(objectArray[j]);
      }
    }
  }
}

function printForecast(locationForcast) {
  console.log();
  console.log(locationForcast.locationName + ' - ' + locationForcast.date);
  console.log(' Summary: ' + locationForcast.precis);
  console.log(' Chance of rain: ' + locationForcast.pop);
  console.log(' Low: ' + locationForcast.airTempMin + '°C');
  console.log(' High: ' + locationForcast.airTempMax + '°C');
  console.log(' Precipitation range: ' + locationForcast.precipRange + '°C');
}
