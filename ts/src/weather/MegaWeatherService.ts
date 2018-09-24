import { Request } from "./io";
import { IService } from "./Service";

interface ILocationResponse {
  "title": string[];
  "location_type": string[];
  "woeid": number[];
  "latt_long": string[];
}

export class MegaWeather implements IService {
  // public static readonly serviceName: string = "MegaWeather";

  public async getForecast(city: string, request: Request): Promise<any> {
    const locationURL = `https://www.metaweather.com/api/location/search/?query=${city}`;
    const [location]: ILocationResponse[] = await request(locationURL) as ILocationResponse[];
    const forecastURL = `https://www.metaweather.com/api/location/${location.woeid}`;
    const forecast = await request(forecastURL);

    return forecast;
  }
}
