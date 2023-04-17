import { Injectable } from '@angular/core';
import { Weather} from '../models/weather';

@Injectable({
  providedIn: 'root',
})

export class WeatherService {
  constructor() {}

   getWeather(location: string): Promise<Weather> {
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=yaISiiqGsZtCmhEQTnshOaTvGPXHjztJ`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const weatherData: Weather = {
            time: data.data.time,
            temperature: data.data.values.temperature,
            weatherCode: data.data.values.weatherCode,
            windSpeed: data.data.values.windSpeed,
            windDirection: data.data.values.windDirection,
            humidity: data.data.values.humidity,
            uvIndex: data.data.values.uvIndex,
            visibility: data.data.values.visibility,
            precipitationProbability: data.data.values.precipitationProbability,
            temperatureApparent: data.data.values.temperatureApparent,
            name: data.location.name, 
            icon: `assets/icons/${data.data.values.weatherCode}.png`
        };
        console.log(weatherData);
        return weatherData;
      });
    }

    getUserLocation(): Promise<string> {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            resolve(`${latitude},${longitude}`);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
}
