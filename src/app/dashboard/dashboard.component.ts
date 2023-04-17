import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private API: WeatherService) {}

  async ngOnInit() {
    const loc = this.API.getUserLocation();
    console.log(loc);
    // console.log(this.API.getWeather(await loc));
  }
}
