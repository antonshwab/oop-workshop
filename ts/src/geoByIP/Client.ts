import fetch from "node-fetch";

export interface IClient {
  request(url: string): Promise<IResponse>;
}

export interface IResponse {
  as: string;
  city: string;
  country: string;
  countryCode: string;
}

export class DefaultClient implements IClient {

  public async request(url: string): Promise<IResponse> {
    const resp = await fetch(url);
    const response = await resp.json() as IResponse;
    return response;
  }
}
