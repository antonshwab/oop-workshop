import { Request } from "./io";

export interface IService {
  getForecast(city: string, request: Request): Promise<any>;
}

// export abstract class Service {
//   public abstract getServiceName(): string;
//   public abstract async getForecast(city: string, request: Request): Promise<any>;
// }
