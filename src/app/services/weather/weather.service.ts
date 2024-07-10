import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl =
    'https://api.open-meteo.com/v1/forecast?latitude=33.7215&longitude=73.0433&current=temperature_2m';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
