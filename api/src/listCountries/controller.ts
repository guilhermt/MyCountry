import { Request, Response } from "express";
import { listCountries } from "./services/listCountries";

export const listCountriesController = async (req: Request, res: Response) => {
  try {
    const countries = await listCountries();

    res.json(countries);
  } catch (e) {
    console.log("Error in the list countries controller:", e);
    res.json({ status: 500, message: "Unexpected server error" });
  }
};
