import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { WeatherForecast } from '../models/weather.models'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`${environment.apiUrl}?appid=${environment.apiKey}&q=Maribor&units=metric`)
  }
}
