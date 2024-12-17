import { Request, Response } from "express";
import { getCountryInfo } from "./services/getCountryInfo";
import { getPopulations } from "./services/getPopulations";
import { getFlags } from "./services/getFlags";
import { getAlpha3CountryCode } from "../utils/getIso3CountryCode";
import { CountryData } from "./types";

export const getCountryController = async (req: Request, res: Response) => {
  try {
    const alpha2CountryCode = req.params?.id;

    if (!alpha2CountryCode) {
      res.json({ status: 400, message: "Country Id is required" });
      return;
    }

    const alpha3CountryCode = getAlpha3CountryCode(alpha2CountryCode);

    if (!alpha3CountryCode) {
      res.json({ status: 400, message: "Invalid Country Id" });
      return;
    }

    const dataPromises = Promise.all([
      getCountryInfo(alpha2CountryCode),
      getPopulations(),
      getFlags(),
    ]);

    const [countryInfo, AllPopulations, AllFlags] = await dataPromises;

    const population = AllPopulations.find(
      ({ iso3 }) => iso3 === alpha3CountryCode,
    );

    const flag = AllFlags.find(({ iso3 }) => iso3 === alpha3CountryCode);

    if (!countryInfo || !population || !flag) {
      res.json({ status: 400, message: "Country Data not found" });
      return;
    }

    const { commonName, countryCode, borders } = countryInfo;

    const countryData: CountryData = {
      name: commonName,
      code: countryCode,
      flag: flag.flag,
      borders: borders.map((border) => ({
        name: border.commonName,
        code: border.countryCode,
      })),
    };

    res.json({ countryData });
  } catch (e) {
    console.log("Error in the get country controller:", e);
    res.json({ status: 500, message: "Unexpected server error" });
  }
};
