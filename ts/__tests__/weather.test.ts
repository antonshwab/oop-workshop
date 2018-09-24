import * as fs from "fs";
import * as nock from "nock";
import { Weather } from "../src/weather";
import { IService } from "../src/weather/Service";
import { Request } from "../src/weather/io";
import { MetaWeather } from "../src/weather/MetaWeatherService";

describe("Weather", async () => {
  nock.disableNetConnect();

  const barcelonaLocationJSON = fs.readFileSync(`${__dirname}/__fixtures__/locationResponse.json`, 'utf8').toString();

  const barcelonaForecastJSON = fs.readFileSync(`${__dirname}/__fixtures__/forecastResponse.json`, 'utf8').toString();

  const barcelonaOpenWeatherForecastJSON = fs.readFileSync(`${__dirname}/__fixtures__/forecastResponse.json`, "utf8").toString();

  it("test with nock", async () => {

    const expectedMetaWeatherForecast = JSON.parse(barcelonaForecastJSON);
    const expectedMegaWeatherForecast = expectedMetaWeatherForecast;

    const weather = new Weather();

    nock(`https://www.metaweather.com/api/location`)
      .get(`/search/?query=barcelona`)
      .reply(200, barcelonaLocationJSON);

    nock(`https://www.metaweather.com/api/location`)
      .get(`/753692`)
      .reply(200, barcelonaForecastJSON, { 'Content-Type': 'application/json' });

    const forecast1 = await weather.getForecast("barcelona");
    expect(forecast1).toEqual(expectedMetaWeatherForecast);


    nock(`https://www.metaweather.com/api/location`)
      .get(`/search/?query=barcelona`)
      .reply(200, barcelonaLocationJSON);

    nock(`https://www.metaweather.com/api/location`)
      .get(`/753692`)
      .reply(200, barcelonaForecastJSON);

    const forecast2 = await weather.getForecast("barcelona", "MegaWeather");
    expect(forecast2).toEqual(expectedMegaWeatherForecast);
  });

  it("add service", async () => {
    const expectedOpenWeatherForecast = JSON.parse(barcelonaOpenWeatherForecastJSON);
    const appID = "8e3e3073408dd6ddd936d1e148e2f986";
    const city = "barcelona";
    nock(`https://api.openweathermap.org/data/2.5`)
      .get(`/forecast?q=${city}&appid=${appID}`)
      .reply(200, expectedOpenWeatherForecast);

    class OpenWeatherMap implements IService {
      public static serviceName: string = "OpenWeatherMap";

      public async getForecast(city: string, request: Request): Promise<any> {
        const appID = "8e3e3073408dd6ddd936d1e148e2f986";
        const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${appID}`;
        const forecast = await request(apiURL);
        return forecast;
      }
    }

    const services = {
      [OpenWeatherMap.serviceName]: () => new OpenWeatherMap()
    };

    const weather = new Weather(services);
    const forecast3 = await weather.getForecast(city, "OpenWeatherMap");
    expect(forecast3).toEqual(expectedOpenWeatherForecast);
  });

  it("test with simple DI", async () => {

    const expectedMetaWeatherForecast = JSON.parse(barcelonaForecastJSON);

    const weather = new Weather();
    const request: Request = async (url: string) => {
      if (url === `https://www.metaweather.com/api/location/search/?query=barcelona`) {
        return JSON.parse(barcelonaLocationJSON);
      }
      if (url === `https://www.metaweather.com/api/location/753692`) {
        return expectedMetaWeatherForecast;
      }
    };

    const forecast = await weather.getForecast("barcelona", "MetaWeather", request);
    expect(forecast).toEqual(expectedMetaWeatherForecast);
  });


  // TODO: with inversifyTS
});
