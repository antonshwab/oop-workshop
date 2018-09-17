import fetch from "node-fetch";
import { IClient, IResponse } from "./Client";

export class DefaultClient extends IClient {

  public async request(url: string): Promise<IResponse> {
    const resp = await fetch(url);
    const response = await resp.json() as IResponse;
    return response;
  }
}
