import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { WeatherService } from '../../services/weather/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  weatherData: any;

  constructor(
    public authService: AuthService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getWeather();
  }

  isLogin() {
    const obj = this.authService.getLoginUser();
    const length = Object.keys(obj).length;
    return length > 0;
  }
  getWeather(): void {
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        console.log(data);
        this.weatherData = data;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      },
    });
  }
}
