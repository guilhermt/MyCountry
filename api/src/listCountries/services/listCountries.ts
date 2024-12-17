import axios from "axios";
import { ListCountriesResponse } from "../types";

const dateNagerApiUrl = process.env.DATE_NAGER_API_URL ?? "";

if (!dateNagerApiUrl) {
  throw new Error(
    "DATE_NAGER_API_URL is not defined in the environment variables",
  );
}

export const listCountries = async () => {
  try {
    const countriesResponse = await axios.get<ListCountriesResponse>(
      `${dateNagerApiUrl}/AvailableCountries`,
    );

    const countries = countriesResponse.data;

    if (!countries || !Array.isArray(countries) || !countries.length) {
      throw new Error("Bad response from Date Nager Api");
    }

    return countries;
  } catch (e) {
    console.log("Error while Fetching countries");
    throw e;
  }
};
