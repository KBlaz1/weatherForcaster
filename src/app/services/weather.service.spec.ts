import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { WeatherService } from './weather.service';
import { WeatherForecast } from '../models/weather.models'
import { environment } from 'src/environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weatehr forecast', () => {
    const mockForecast: WeatherForecast = {
      cod: '200',
      message: 0,
      cnt: 40,
      list: [],
      city: {
        id: 12345,
        name: 'Maribor',
        coord: { lat: 46.55, lon: 15.65 },
        country: 'SI',
        population: 100000,
        timezone: 3600,
        sunrise: 1623123456,
        sunset: 1623198765
      },
      dt: 0,
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        sea_level: 0,
        grnd_level: 0,
        humidity: 0,
        temp_kf: 0
      },
      weather: [],
      clouds: {
        all: 0
      },
      wind: {
        speed: 0,
        deg: 0,
        gust: 0
      },
      visibility: 0,
      pop: 0,
      sys: {
        pod: ''
      },
      dt_txt: ''
    }

    service.getForecast().subscribe(forecast => {
      expect(forecast).toEqual(mockForecast);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}?appid=${environment.apiKey}&q=Maribor&units=metric`);
    expect(req.request.method).toBe('GET');
    req.flush(mockForecast);
  })
});
