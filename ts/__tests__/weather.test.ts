import * as fs from "fs";
import * as nock from "nock";
import { IForecastResponse, Weather } from "../src/weather";

describe("Weather", async () => {
  nock.disableNetConnect();

  const barcelonaLocationJSON = fs.readFileSync(`${__dirname}/__fixtures__/locationResponse.json`, 'utf8').toString();

  const barcelonaForecastJSON = fs.readFileSync(`${__dirname}/__fixtures__/forecastResponse.json`, 'utf8').toString();


  it("test with nock", async () => {

    const expectedForecast: IForecastResponse = JSON.parse(barcelonaForecastJSON) as IForecastResponse;

    const weather = new Weather();

    nock(`https://www.metaweather.com/api/location`)
      .get(`/search/?query=barcelona`)
      .reply(200, barcelonaLocationJSON);

    nock(`https://www.metaweather.com/api/location`)
      .get(`/753692`)
      .reply(200, barcelonaForecastJSON);

    const forecast1 = await weather.getForecast("barcelona", "MetaWeather");
    expect(forecast1).toEqual(expectedForecast);


    nock(`https://www.metaweather.com/api/location`)
      .get(`/search/?query=barcelona`)
      .reply(200, barcelonaLocationJSON);

    nock(`https://www.metaweather.com/api/location`)
      .get(`/753692`)
      .reply(200, barcelonaForecastJSON);

    const forecast2 = await weather.getForecast("barcelona", "MegaWeather");
    expect(forecast2).toEqual(expectedForecast);
  });

  // TODO:
  // it("test with DI", () => {
  // class Client implements IClient {
  //   public async request(city: string): Promise<IResponse> {
  //     const response = {
  //     } as IResponse;

  //     return new Promise(resolve => resolve(response));
  //   }
  // }
  // });


  // TODO: test it with inversifyTS
});
