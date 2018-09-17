export abstract class IClient {
  public abstract async request(url: string): Promise<IResponse>;
}

export interface IResponse {
  as: string;
  city: string;
  country: string;
  countryCode: string;
}
