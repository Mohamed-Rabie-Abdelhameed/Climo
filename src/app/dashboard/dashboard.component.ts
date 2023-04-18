import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private API: WeatherService) {}

  weatherData: Weather = {
    time: '26262',
    temperature: 0,
    weatherCode: 1000,
    weatherCondition: 'Clear, Sunny',
    windSpeed: 0,
    windDirection: 0,
    humidity: 0,
    uvIndex: 0,
    visibility: 0,
    precipitationProbability: 0,
    temperatureApparent: 0,
    name: 'fhgfjgjfjg',
  };

  async ngOnInit() {
    const loc = this.API.getUserLocation();
    console.log(loc);
    // this.weatherData = await this.API.getWeather(await loc);
    // console.log(this.API.getWeather(await loc));
  }

   formatDateTime(dateTimeString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateTime = new Date(dateTimeString);
    const dayOfWeek = daysOfWeek[dateTime.getDay()];
    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dayOfWeek}, ${time}`;
  }
}
