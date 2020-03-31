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

function printAll() {
  for (var i = 0; i < (objectArray.length - 1); i++)  {
    console.log(objectArray[i].locationName);
  }
}

function loopResults(json) {
  var areaArray = json.product.forecast[0].area;

  for (var i = 2; i < areaArray.length; i++) {
    if (areaArray[i].$.type != 'public-district') {

      var locationForcast = new Object({});

      locationForcast.locationName = areaArray[i].$.description;

      objectArray.push(locationForcast);
    }
  }
  printAll();
}

function extractXml(data) {
  parseString(data, function (err, result) {
      loopResults(result);
  });

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

var arguments = process.argv.slice(2);

var locationArg = arguments[0];
switch (locationArg){
  case 'nsw':
    console.log('');
    console.log('NSW');
    console.log('');
    extract(apiEndpoint + nswExtension); //NSW
    break;
  case 'qld':
    console.log('');
    console.log('QLD');
    console.log('');
    extract(apiEndpoint + qldExtension); //QLD
    break;
  case 'nt':
    console.log('');
    console.log('NT');
    console.log('');
    extract(apiEndpoint + ntExtension); //NT
    break;
  case 'sa':
    console.log('');
    console.log('SA');
    console.log('');
    extract(apiEndpoint + saExtension); //SA
    break;
  case 'vic':
    console.log('');
    console.log('VIC');
    console.log('');
    extract(apiEndpoint + vicExtension); //VIC
    break;
  case 'wa':
    console.log('');
    console.log('WA');
    console.log('');
    extract(apiEndpoint + waExtension); //WA
    break;
  case 'tas':
    console.log('');
    console.log('TAS');
    console.log('');
    extract(apiEndpoint + tasExtension); //TAS
    break;
  default:
    console.log('Enter state as an argument (nsw/qld/sa/nt/vic/wa/tas)');
}
