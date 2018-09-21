import { ClientRequest, IForecastResponse, ILocationResponse } from "./io";
import { Service } from "./Service";

class MegaWeatherService extends Service {
  public static readonly serviceName: string = "MegaWeatherService";

  public async getForecast(city: string, request: ClientRequest): Promise<IForecastResponse> {
    const locationURL = `https://www.metaweather.com/api/location/search/?query=${city}`;
    const [location]: ILocationResponse[] = await request(locationURL) as ILocationResponse[];

    const forecastURL = `https://www.metaweather.com/api/location/${location.woeid}`;
    const forecast = await request(forecastURL) as IForecastResponse;

    return forecast;
  }
}
