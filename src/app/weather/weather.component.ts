import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../weather-api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  chart: any;

  constructor( private route: ActivatedRoute,
    private weatherApiService: WeatherApiService) { }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    
      if (id) {
        this.weatherApiService.getWeatherForecast(id).subscribe(
          (data) => {
            this.weatherData = data;
            this.createChart();
          },
          (error) => {
            console.error('Error fetching weather data:', error);
          }
        );
      } else {
        console.error('ID parameter is null');
      }
    }

  createChart(): void {
    const dates = this.weatherData.properties.periods.map((period: any) => period.name);
    const temperatures = this.weatherData.properties.periods.map((period: any) => period.temperature);

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            data: temperatures,
            label: 'Temperature Forecast',
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
    });
  }


}
