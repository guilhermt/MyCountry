import { Request, Response } from "express";
import { listCountries } from "./services/listCountries";
import { ListCountriesData } from "./types";

export const listCountriesController = async (req: Request, res: Response) => {
  try {
    const countries = await listCountries();

    const listCountriesData: ListCountriesData = countries.map(
      ({ name, countryCode }) => ({ name, code: countryCode }),
    );

    res.json(listCountriesData);
  } catch (e) {
    console.log("Error in the list countries controller:", e);
    res.json({ status: 500, message: "Unexpected server error" });
  }
};
