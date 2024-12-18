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
    value: number
  }[]
}

export interface SimpleCountryData {
  name: string;
  code: string;
}

export type CountriesData = SimpleCountryData[];
