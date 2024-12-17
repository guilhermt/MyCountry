import axios from "axios";
import { GetFlagsResponse } from "../types";

const countriesNowApiUrl = process.env.COUNTRIES_NOW_API_URL ?? "";

if (!countriesNowApiUrl) {
  throw new Error(
    "COUNTRIES_NOW_API_URL is not defined in the environment variables",
  );
}

export const getFlags = async () => {
  try {
    const FlagsResponse = await axios.get<GetFlagsResponse>(
      `${countriesNowApiUrl}/countries/flag/images`,
    );

    if (!FlagsResponse.data || FlagsResponse.data.error) {
      throw new Error("Bad response from Date Nager Api");
    }

    const flags = FlagsResponse.data.data;

    return flags;
  } catch (e) {
    console.log("Error while fetching countries flags");
    throw e;
  }
};
