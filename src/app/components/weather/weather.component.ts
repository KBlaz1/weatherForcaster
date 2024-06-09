import { Component, OnInit } from '@angular/core';
import { WeatherForecast } from 'src/app/models/weather.models';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent  implements OnInit {
  weatherData?: WeatherForecast;
  loading: boolean = true;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.fetchWeather();
  }

  fetchWeather() {
    this.weatherService.getForecast().subscribe(data => {
      this.weatherData = data
      this.loading = false
    })
  }

}