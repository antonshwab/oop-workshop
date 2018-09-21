
# Table of Contents

1.  [Get geo location by IP](#orgb172793)
2.  [Ger forecast for city](#org2721c56)


<a id="orgb172793"></a>

# Get geo location by IP

    const geoByIP = new GeoByIP();
    const response = await geoByIP.getLocation(ip);
    console.log(response.city);


<a id="org2721c56"></a>

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
    5.  maybe make conversion to IForecastResponse from other services's response formats
