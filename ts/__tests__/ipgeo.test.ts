import * as nock from "nock";
import { GeoByIP } from "../src";
import { IClient, IResponse } from "../src/geoByIP/Client";

describe("Geo by IP", () => {

  it("test with nock", async () => {
    const host = "http://ip-api.com/json";
    const ip = "46.53.205.195";
    const body = {
      "as": "AS20852 Velcom AZS LLC",
      "city": "Minsk",
      "country": "Belarus",
      "countryCode": "BY"
    };

    nock.disableNetConnect();
    nock(host)
      .get(`/${ip}`)
      .reply(200, body);

    const geoByIP = new GeoByIP();
    const resp = await geoByIP.getLocation(ip);

    const city = "Minsk";
    expect(resp.city).toBe(city);
  });

  it("test with DI", async () => {

    class Client implements IClient {
      public async request(url: string): Promise<IResponse> {
        const response = {
          "as": "AS20852 Velcom AZS LLC",
          "city": "Minsk",
          "country": "Belarus",
          "countryCode": "BY"
        } as IResponse;

        return new Promise(resolve => resolve(response));
      }
    }

    const clientDI: IClient = new Client();
    const geoByIP = new GeoByIP(clientDI);

    const ip = "46.53.205.195";
    const resp = await geoByIP.getLocation(ip);

    const city = "Minsk";
    expect(resp.city).toBe(city);
  });
});
