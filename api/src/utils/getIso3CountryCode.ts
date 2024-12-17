import { whereAlpha2 } from "iso-3166-1";

export const getAlpha3CountryCode = (alpha2Code: string) => {
  const country = whereAlpha2(alpha2Code);

  if (!country) return false;

  return country.alpha3;
};
