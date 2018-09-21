import fs from "fs";
import nock from "nock";
import { Weather } from "../src";
import { IClient, IResponse } from "../src/geoByIP/Client";

describe("Weather", async () => {
  nock.desableNetConnect();

  const barcelonaLocationJSON = await fs.readFile('__dirname/__fixtures__/locationResponse.json', 'utf8').toString();

  const barcelonaForecastJSON = await fs.readFile('__dirname/__fixtures__/forecastResponse.json', 'utf8').toString();

  const nockBarcelonaLocationJSON = () => barcelonaLocationJSON;
  const nockBarcelonaForecastResponse = () => barcelonaForecastJSON;

  nock(`https://www.metaweather.com/api/location`)
    .get(`/search/?query=barcelona`)
    .reply(200, nockBarcelonaLocationJSON);

  nock(`https://www.metaweather.com/api/location`)
    .get(`/753692/`)
    .reply(200, nockBarcelonaForecastResponse);

  it("test with nock", async () => {

    const expectedForecast: IForecastResponse = JSON.parse(barcelonaForecastJSON) as IForecastResponse;

    const weather = new Weather();
    const forecast = await weather.getForecast("barcelona", "MetaWeather");
    expect(forecast).toBe(expectedForecast);

    // test second service
  });

  // it("test with DI", () => {
  // class Client implements IClient {
  //   public async request(city: string): Promise<IResponse> {
  //     const response = {
  //     } as IResponse;

  //     return new Promise(resolve => resolve(response));
  //   }
  // }
  // });

});
