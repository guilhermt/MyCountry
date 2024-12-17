interface ListCountriesResponseItem {
  countryCode: string;
  name: string;
}

export type ListCountriesResponse = ListCountriesResponseItem[];

interface ListCountriesDataItem {
  name: string;
  code: string;
}

export type ListCountriesData = ListCountriesDataItem[];
