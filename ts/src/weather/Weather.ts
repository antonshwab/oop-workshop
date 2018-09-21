class Weather {

  public services: { [serviceName: string]: () => Service } = {
    [MetaWeatherService.serviceName]: () => new MetaWeatherService(),
    [MegaWeatherService.serviceName]: () => new MegaWeatherService()
  };

  public async getForecast(
    city: string, serviceName: string,
    request: ClientRequest = defaultClientRequest): Promise<IForecastResponse> {

    const newServiceKlass = this.services[serviceName];

    const service = newServiceKlass();

    const forecast = await service.getForecast(city, request);

    return forecast;
  }
}

export default Weather;
