import { CountriesData, CountryData } from '@/@types/models';
import { api } from './api';

export const getCountries = async () => {
  const res = await api.get<CountriesData>('/countries');

  return res.data;
};

export const getCountry = async (countryId: string) => {
  const res = await api.get<CountryData>(`/countries/${countryId}`);

  return res.data;
};
