import "./utils/loadEnv";
import express, { Express, json } from "express";
import cors from "cors";
import { listCountriesController } from "./listCountries/controller";
import { getCountryController } from "./getCountry/controller";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.get("/countries", listCountriesController);
app.get("/countries/:id", getCountryController);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
