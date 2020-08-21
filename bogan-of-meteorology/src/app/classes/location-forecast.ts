export class LocationForecast {
  locationName: string;
  date: string;
  precis: string;
  boganisedPrecis: string;
  pop: string;
  boganisedPop: string;
  airTempMin: string;
  boganisedAirTempMin: string;
  airTempMax: string;
  boganisedAirTempMax: string;
  precipRange: string;
  boganisedPrecipRange: string;

  constructor(locationName: string,
    date: string,
    precis: string,
    boganisedPrecis: string,
    pop: string,
    boganisedPop: string,
    airTempMin: string,
    boganisedAirTempMin: string,
    airTempMax: string,
    boganisedAirTempMax: string,
    precipRange: string,
    boganisedPrecipRange: string
  )
    {
      this.locationName = locationName;
      this.date = date;
      this.precis = precis;
      this.boganisedPrecis = boganisedPrecis;
      this.pop = pop;
      this.boganisedPop = boganisedPop;
      this.airTempMin = airTempMin;
      this.boganisedAirTempMin = boganisedAirTempMin;
      this.airTempMax = airTempMax;
      this.boganisedAirTempMax = boganisedAirTempMax;
      this.precipRange = precipRange;
      this.boganisedPrecipRange = boganisedPrecipRange;
  }
}
