import axios from "axios";
import { GetCountryInfoReponse } from "../types";

const dateNagerApiUrl = process.env.DATE_NAGER_API_URL ?? "";

if (!dateNagerApiUrl) {
  throw new Error(
    "DATE_NAGER_API_URL is not defined in the environment variables",
  );
}

export const getCountryInfo = async (countryId: string) => {
  try {
    const countryResponse = await axios.get<GetCountryInfoReponse>(
      `${dateNagerApiUrl}/CountryInfo/${countryId}`,
    );

    const country = countryResponse.data;

    if (!country || !country?.commonName) {
      throw new Error("Bad response from Date Nager Api");
    }

    return country;
  } catch (e) {
    console.log("Error while Fetching country");
    throw e;
  }
};
