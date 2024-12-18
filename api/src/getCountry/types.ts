export interface GetCountryInfoReponse {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
  }[];
}

interface CountryPopulation {
  country: string;
  code: string;
  iso3: string;
  populationCounts: {
    year: number;
    value: number;
  };
}

export interface GetPopulationsResponse {
  error: boolean;
  data: CountryPopulation[];
}

interface CountryFlag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface GetFlagsResponse {
  error: boolean;
  data: CountryFlag[];
}

export interface CountryData {
  name: string;
  code: string;
  flag: string;
  borders: {
    name: string;
    code: string;
  }[];
  population: {
    year: number;
    value: number;
  };
}
