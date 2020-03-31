export class LocationForecast {
  locationName: string;
  date: string;
  precis: string;
  pop: string;
  airTempMin: string;
  airTempMax: string;
  precipRange: string;

  constructor(locationName: string, date: string, precis: string, pop: string,
    airTempMin: string, airTempMax: string, precipRange: string) {
      this.locationName = locationName;
      this.date = date;
      this.precis = precis;
      this.pop = pop;
      this.airTempMin = airTempMin;
      this.airTempMax = airTempMax;
      this.precipRange = precipRange;
  }
}
