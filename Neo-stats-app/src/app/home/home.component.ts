import { Component, OnInit } from '@angular/core';
import { AsteroidsService } from '../service/asteroids.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _http: AsteroidsService) { }
  getAsteroid: any = [];
  asteroids: any = [];
  ngOnInit(): void { }

  pickDateForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  startDates: any;
  endDates: any;
  StartDate: any;
  entries: any;
  fastSpeed: any;
  fastAstroid: any;
  fastAstroidID: any;
  minSize: any;
  maxSize: any;
  averageSize: any;
  keys: any;
  values: any;
  lengthArray: any = [];
  displayData = "hideDetails";
  error: boolean = false;
  loading: boolean = false;

  getDates() {
    this.loading = true;
    this.startDates = this.pickDateForm.value.startDate;
    this.endDates = this.pickDateForm.value.endDate;
    this._http.getAsteroids(this.startDates, this.endDates).subscribe(data => {
      this.displayData = "showDetails";
      this.getAsteroid = data;

      this.asteroids = (this.getAsteroid.near_earth_objects);
      this.loading = false;
      this.entries = Object.entries(this.asteroids);
      this.keys = Object.keys(this.asteroids);
      this.values = Object.values(this.asteroids);
      this.values.forEach((item: any) => {
        this.lengthArray.push(item.length)
      });
      const speed: any = []
      let fastestAstroidData;
      this.entries.forEach((date: any) => {
        date[1].forEach((data: any) => {
          speed.push(data.close_approach_data[0].relative_velocity.kilometers_per_hour);
        });
      });
      this.fastSpeed = Math.max(...speed)

      this.entries.forEach((date: any) => {
        fastestAstroidData = date[1].filter((data: any) => {
          return JSON.stringify(data).includes(this.fastSpeed)
        });
        if (fastestAstroidData != "") {
          this.fastAstroid = fastestAstroidData;
          this.fastAstroidID = fastestAstroidData[0].id;
          this.maxSize = fastestAstroidData[0].estimated_diameter.kilometers.estimated_diameter_max;
          this.minSize = fastestAstroidData[0].estimated_diameter.kilometers.estimated_diameter_min;
          this.averageSize = (this.minSize + this.maxSize) / 2;
        }
      });

      let myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.keys,
          datasets: [{
            label: 'Number of Astroids',
            data: this.lengthArray,
            borderWidth: 1,
            borderColor: "red",
            backgroundColor: '#9966ff',
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    },
      (error) => {
        this.error = true;
        this.loading = false;
        this.displayData = "hideDetails";

      });
  }
}