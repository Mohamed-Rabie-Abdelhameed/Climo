import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private API: WeatherService) {}

  @ViewChild('searchInput') searchInput!: ElementRef;

  loc: string = 'New York';

  weatherData: Weather = {
    time: '26262',
    temperature: 0,
    weatherCode: 1000,
    cloudCover: 0,
    weatherCondition: 'Clear, Sunny',
    windSpeed: 0,
    windDirection: 0,
    humidity: 0,
    uvIndex: 0,
    visibility: 0,
    precipitationProbability: 0,
    temperatureApparent: 0,
    name: 'undefined',
    animate: true,
  };

  forecastData: Weather[] = [
    {
      time: '26262',
      temperature: 0,
      weatherCode: 1000,
      cloudCover: 0,
      weatherCondition: 'Clear, Sunny',
      windSpeed: 0,
      windDirection: 0,
      humidity: 0,
      uvIndex: 0,
      visibility: 0,
      precipitationProbability: 0,
      temperatureApparent: 0,
      name: 'undefined',
      animate: true,
    },
    {
      time: '26262',
      temperature: 0,
      weatherCode: 1000,
      cloudCover: 0,
      weatherCondition: 'Clear, Sunny',
      windSpeed: 0,
      windDirection: 0,
      humidity: 0,
      uvIndex: 0,
      visibility: 0,
      precipitationProbability: 0,
      temperatureApparent: 0,
      name: 'undefined',
      animate: true,
    },
    {
      time: '26262',
      temperature: 0,
      weatherCode: 1000,
      cloudCover: 0,
      weatherCondition: 'Clear, Sunny',
      windSpeed: 0,
      windDirection: 0,
      humidity: 0,
      uvIndex: 0,
      visibility: 0,
      precipitationProbability: 0,
      temperatureApparent: 0,
      name: 'undefined',
      animate: true,
    },
    {
      time: '26262',
      temperature: 0,
      weatherCode: 1000,
      cloudCover: 0,
      weatherCondition: 'Clear, Sunny',
      windSpeed: 0,
      windDirection: 0,
      humidity: 0,
      uvIndex: 0,
      visibility: 0,
      precipitationProbability: 0,
      temperatureApparent: 0,
      name: 'undefined',
      animate: true,
    },
    {
      time: '26262',
      temperature: 0,
      weatherCode: 1000,
      cloudCover: 0,
      weatherCondition: 'Clear, Sunny',
      windSpeed: 0,
      windDirection: 0,
      humidity: 0,
      uvIndex: 0,
      visibility: 0,
      precipitationProbability: 0,
      temperatureApparent: 0,
      name: 'undefined',
      animate: true,
    },
  ];

  isSmall: boolean = false;

  async ngOnInit() {
    this.isSmall = this.isSmallScreen;
    this.loc = await this.API.getUserLocation();
    console.log(this.loc);
    this.forecastData = await this.API.getForecast(this.loc);
    console.log(this.forecastData);
    this.weatherData = await this.API.getWeather(await this.loc);
  }

  formatDateTime(dateTimeString: string): string {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dateTime = new Date(dateTimeString);
    const dayOfWeek = daysOfWeek[dateTime.getDay()];
    const time = dateTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${dayOfWeek}, ${time}`;
  }

  formatLocation(location: string): string {
    try {
      const parts = location.split(', ');
      const city = parts[0];
      const country = parts[parts.length - 1];
      return `${city}, ${country}`;
    } catch {
      return location;
    }
  }

  getWindDirection(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  getDayOfWeek(dateTimeString: string): string {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dateTime = new Date(dateTimeString);
    const dayOfWeek = daysOfWeek[dateTime.getDay()];
    return dayOfWeek;
  }

  async onSearch() {
    const location = this.searchInput.nativeElement.value;
    this.loc = location;
    this.weatherData.animate = false;
    this.weatherData = await this.API.getWeather(location);
    this.weatherData.animate = true;
    console.log(this.weatherData);
    this.forecastData = await this.API.getForecast(location);
  }

  get isSmallScreen(): boolean {
    return window.innerWidth < 768;
  }
}
