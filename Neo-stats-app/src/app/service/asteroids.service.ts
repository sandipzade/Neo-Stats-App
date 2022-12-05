import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsteroidsService {

  constructor(private http: HttpClient) { }

  ApiKey = "Zl5ZDEoyJTKoxSmrwLJV2yCu547BMGcSUnnEC1Uy";

  getAsteroids(startDate: any, endDate: any) {
    const startDates = startDate;
    const endDates = endDate;
    return this.http.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDates}&end_date=${endDates}&api_key=${this.ApiKey}`)
  }
}