import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

   weatherConditions: { [key: string]: string } = {
    "0": "Unknown",
    "1000": "Clear, Sunny",
    "1100": "Mostly Clear",
    "1101": "Partly Cloudy",
    "1102": "Mostly Cloudy",
    "1001": "Cloudy",
    "2000": "Fog",
    "2100": "Light Fog",
    "4000": "Drizzle",
    "4001": "Rain",
    "4200": "Light Rain",
    "4201": "Heavy Rain",
    "5000": "Snow",
    "5001": "Flurries",
    "5100": "Light Snow",
    "5101": "Heavy Snow",
    "6000": "Freezing Drizzle",
    "6001": "Freezing Rain",
    "6200": "Light Freezing Rain",
    "6201": "Heavy Freezing Rain",
    "7000": "Ice Pellets",
    "7101": "Heavy Ice Pellets",
    "7102": "Light Ice Pellets",
    "8000": "Thunderstorm"
  };

  getWeather(location: string): Promise<Weather> {
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=yaISiiqGsZtCmhEQTnshOaTvGPXHjztJ`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const weatherData: Weather = {
          time: data.data.time,
          temperature: Math.floor(data.data.values.temperature),
          weatherCode: data.data.values.weatherCode,
          weatherCondition: this.weatherConditions[data.data.values.weatherCode],
          cloudCover: data.data.values.cloudCover,
          windSpeed: data.data.values.windSpeed,
          windDirection: data.data.values.windDirection,
          humidity: data.data.values.humidity,
          uvIndex: data.data.values.uvIndex,
          visibility: data.data.values.visibility,
          precipitationProbability: data.data.values.precipitationProbability,
          temperatureApparent: data.data.values.temperatureApparent,
          name: data.location.name,
          animate: true,
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

  getForecast(location: string): Promise<Weather[]> {
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=daily&apikey=yaISiiqGsZtCmhEQTnshOaTvGPXHjztJ`;
    return fetch(url).then((response) => response.json()).then((data) => {
      console.log(data);
      const forecastData: Weather[] = [];
      for (let i = 0; i < data.timelines.daily.length; i++) {
        const weatherData: Weather = {
          time: data.timelines.daily[i].time,
          temperature: Math.floor(data.timelines.daily[i].values.temperatureAvg),
          weatherCode: data.timelines.daily[i].values.weatherCodeMax,
          weatherCondition: this.weatherConditions[data.timelines.daily[i].values.weatherCodeMax],
          cloudCover: data.timelines.daily[i].values.cloudCoverAvg,
          windSpeed: data.timelines.daily[i].values.windSpeedAvg,
          windDirection: data.timelines.daily[i].values.windDirectionAvg,
          humidity: data.timelines.daily[i].values.humidityAvg,
          uvIndex: data.timelines.daily[i].values.uvIndexAvg,
          visibility: data.timelines.daily[i].values.visibilityAvg,
          precipitationProbability: data.timelines.daily[i].values.precipitationProbabilityAvg,
          temperatureApparent: data.timelines.daily[i].values.temperatureApparentAvg,
          name: data.location.name,
          animate: true,
        };
        forecastData.push(weatherData);
      }
      console.log(forecastData);
      return forecastData;
    });
  }
}
