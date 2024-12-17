import axios from "axios";
import { GetPopulationsResponse } from "../types";

const countriesNowApiUrl = process.env.COUNTRIES_NOW_API_URL ?? "";

if (!countriesNowApiUrl) {
  throw new Error(
    "COUNTRIES_NOW_API_URL is not defined in the environment variables",
  );
}

export const getPopulations = async () => {
  try {
    const populationsResponse = await axios.get<GetPopulationsResponse>(
      `${countriesNowApiUrl}/countries/population`,
    );

    if (!populationsResponse.data || populationsResponse.data.error) {
      throw new Error("Bad response from Date Nager Api");
    }

    const populations = populationsResponse.data.data;

    return populations;
  } catch (e) {
    console.log("Error while fetching countries populations");
    throw e;
  }
};
