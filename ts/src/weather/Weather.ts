import { getLogger } from "log4js";
import { defaultRequest, Request } from "./io";
import { MegaWeather } from "./MegaWeatherService";
import { MetaWeather } from "./MetaWeatherService";
import { IService } from "./Service";

const logger = getLogger("Weather");
logger.level = "debug";

class Weather {

  public static defaultServices: { [serviceName: string]: () => IService } = {
    [MetaWeather.name]: () => new MetaWeather(),
    [MegaWeather.name]: () => new MegaWeather()
  };

  public services: { [serviceName: string]: () => IService };

  constructor(services: { [serviceName: string]: () => IService } = Weather.defaultServices) {
    const merged = {
      ...services,
      ...Weather.defaultServices
    };

    this.services = merged;
  }

  public async getForecast(
    city: string,
    serviceName: string = MetaWeather.name,
    request: Request = defaultRequest): Promise<any> {

    logger.debug("services: ", this.services);
    logger.debug("serviceName", serviceName);
    const newServiceKlass = this.services[serviceName];
    const service = newServiceKlass();
    const forecast = await service.getForecast(city, request);

    logger.debug(forecast);
    return forecast;
  }
}

export default Weather;
