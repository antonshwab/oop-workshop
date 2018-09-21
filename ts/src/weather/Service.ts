import { ClientRequest, IForecastResponse } from "./io";

export abstract class Service {
  public abstract async getForecast(city: string, request: ClientRequest): Promise<IForecastResponse>;
}
