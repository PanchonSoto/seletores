import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';

import { Pais, PaisSmall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string = 'https://restcountries.com/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];



  get regiones(): string[] {
    return [...this._regiones];
  }


  constructor(private http: HttpClient) { }


  getCountryRegion(region: string): Observable<PaisSmall[]> {

    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code,name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getCountryCode(code: string): Observable<Pais | null> {

    if (!code) {
      return of(null)
    }
    const url = `${this._baseUrl}/alpha/${code}`;
    return this.http.get<Pais>(url);
  }

  getCountrySmall(code: string): Observable<PaisSmall> {

    const url = `${this._baseUrl}/alpha/${code}?fields=alpha3Code,name`;
    return this.http.get<Pais>(url);
  }

  getCountriesCode(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) {
      return of([]);
    }

    const petitions: Observable<PaisSmall>[]= [];

    borders.forEach(code=>{
      const petition = this.getCountrySmall(code);
      petitions.push(petition);
    });

    return combineLatest(petitions);
  }
}
