import dotenv from 'dotenv';
dotenv.config();

// start SERVICE_v02.01 code
// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  description: string;
  temp: number;
  humidity: number;
  wind: number;
  icon: string;
  constructor(city: string, date: string, description: string, temp: number, humidity: number, wind: number, icon: string) {
    this.city = city;
    this.date = date;
    this.description = description;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
    this.icon = icon;
  }
}
// TODO: Complete the WeatherService class
class WeatherService { // <- starter code
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;
  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process
      .env
      .WEATHER_API_KEY || '';
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) { // <- starter code
     const response = await fetch(query);
    const locationData = await response.json();
    return locationData;
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates { // <- starter code
    const { lat, lon } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string { // <- starter code
     return `${this.baseURL}weather?q=${this.cityName}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string { // <-starter code
     const { lat, lon } = coordinates;
    return `${this.baseURL}onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() { // <- starter code
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) { // <- starter code
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const weatherData = await response.json();
    return weatherData;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) { // <- starter code
    const { name } = response;
    const { dt, weather, main, wind } = response;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;
    return new Weather(name, dt, description, temp, humidity, speed, icon);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) { // <- starter code
     const forecastArray = weatherData.map((day: any) => {
      const { dt, weather, temp, humidity, wind_speed } = day;
      const { description, icon } = weather[0];
      return new Weather(currentWeather.city, dt, description, temp.day, humidity, wind_speed, icon);
    });
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) { // <- starter code
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData.current);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    return { currentWeather, forecastArray };
  }
}
// end SERVICE_v02.01 code
export default new WeatherService();
