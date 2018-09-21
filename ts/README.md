
# Table of Contents

1.  [Get geo location by IP](#org328d8a3)
2.  [Ger forecast for city](#orga030c9d)


<a id="org328d8a3"></a>

# Get geo location by IP

    const geoByIP = new GeoByIP();
    const response = await geoByIP.getLocation(ip);
    console.log(response.city);


<a id="orga030c9d"></a>

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

-   TODO:
    1.  get forecast with default service
    2.  add new service from outside
    3.  Add DI tests
    4.  make CLI interface
    5.  <del>make conversion to general IForecastResponse from other services's response formats</del>
        remove IForecastResponse, use json string or any.
        weather.getForecast("asdf", "servicename") -&#x2014;> json string
        because different services may have different formats
    6.  use defferent weather services
