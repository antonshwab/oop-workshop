
# Table of Contents

1.  [Get geo location by IP](#orga4b560e)
2.  [Ger forecast for city](#org9ba7280)


<a id="orga4b560e"></a>

# Get geo location by IP

    const geoByIP = new GeoByIP();
    const response = await geoByIP.getLocation(ip);
    console.log(response.city);


<a id="org9ba7280"></a>

# Ger forecast for city


    const weather = new Weather();

    // forecast from one service
    const forecast1 = await weather.getForecast("barcelona", "MetaWeather");
    console.log(forecast1.consolidated_weather);

    // forecast from another service
    const forecast2 = await weather.getForecast("london", "MegaWeather");
    console.log(forecast2.consolidated_weather);

    // forecast from default service
    const forecast3 = await weather.getForecast("barcelona");
    console.log(forecast3.consolidated_weather);

    // Add new service
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

-   TODO:

    <del>1. get forecast with default service</del>
    <del>2. add new service from outside</del>
    <del>3. Add DI tests</del>

    1.  add Inversify
    2.  make CLI interface
    3.  <del>make conversion to general IForecastResponse from other services's response formats</del>

    <del>7. use defferent weather services</del>
