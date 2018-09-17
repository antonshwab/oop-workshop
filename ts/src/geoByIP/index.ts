import { IClient, IResponse } from "./Client";
import { DefaultClient } from "./DefaultClient";

class GeoByIP {

  private client: IClient;

  constructor(client?: IClient) {
    this.client = client || new DefaultClient();
  }

  public async getLocation(ip: string): Promise<IResponse> {
    try {
      const response = await this.client.request(`http://ip-api.com/json/${ip}`);
      return response;
    } catch (e) {
      throw Error(e);
    }
  }
}

export default GeoByIP;
