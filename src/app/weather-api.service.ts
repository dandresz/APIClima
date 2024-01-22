import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getWeatherForecast(id: string): Observable<any> {
    const apiUrl = `https://api.weather.gov/gridpoints/${id}/31,80/forecast`;
    return this.http.get(apiUrl);
  }
}
