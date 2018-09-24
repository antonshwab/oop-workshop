import fetch, { Response } from "node-fetch";

export type Request = (url: string) => Promise<any>;

export const defaultRequest: Request = async (url: string) => {
  const resp: Response = await fetch(url);
  const json = await resp.json();
  return json;
};

interface IConsolidatedWeather {
  "id": number;
  "weather_state_name": string;
  "weather_state_abbr": string;
  "wind_direction_compass": string;
  "created": string;
  "applicable_date": string;
  "min_temp": number;
  "max_temp": number;
  "the_temp": number;
  "wind_speed": number;
  "wind_direction": number;
  "air_pressure": number;
  "humidity": number;
  "visibility": number;
  "predictability": number;
}

interface ISource {
  "title": string;
  "slug": string;
  "url": string;
  "crawl_rate": number;
}

interface IParent {
  "title": string;
  "location_type": string;
  "woeid": number;
  "latt_long": string;
}

export interface IForecastResponse {
  "consolidated_weather": IConsolidatedWeather[];
  "time": string;
  "sun_rise": string;
  "sun_set": string;
  "timezone_name": string;
  "parent": IParent;
  "sources": ISource[];
  "title": string;
  "location_type": string;
  "woeid": number;
  "latt_long": string;
  "timezone": string;
}
