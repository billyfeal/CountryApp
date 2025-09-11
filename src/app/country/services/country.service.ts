import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { Region } from '../interfaces/region.type';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheAlphaCode = new Map<string, Country>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const searchQuery = query.toLowerCase();

    if (this.queryCacheCapital.has(searchQuery)) {
      console.log('Cache hit for capital:', searchQuery);
      return of(this.queryCacheCapital.get(searchQuery)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${searchQuery}`).
      pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        tap(countries => this.queryCacheCapital.set(searchQuery, countries)),
        catchError(err => {
          console.error('CountryService.searchByCapital():');
          return throwError(
            () => new Error('Error al buscar países por capital con query: ' + searchQuery)
          );
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const searchQuery = query.toLowerCase();

    if (this.queryCacheCountry.has(searchQuery)) {
      console.log('Cache hit for country:', searchQuery);
      return of(this.queryCacheCountry.get(searchQuery)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${searchQuery}`).
      pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        tap(countries => this.queryCacheCountry.set(searchQuery, countries)),
        catchError(err => {
          console.error('CountryService.searchByCountry():');
          return throwError(
            () => new Error('Error al buscar países por nombre con query: ' + searchQuery)
          );
        })
      );
  }


  searchByAlphaCode(code: string): Observable<Country | undefined> {

    if (this.queryCacheAlphaCode.has(code)) {
      console.log('Cache hit for alpha code:', code);
      return of(this.queryCacheAlphaCode.get(code)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).
      pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        tap(countries => this.queryCacheAlphaCode.set(code, countries.at(0)!)),
        map(countries => countries.at(0)),
        catchError(err => {
          console.error('CountryService.searchByAlphaCode():');
          return throwError(
            () => new Error('Error al buscar países por nombre con query: ' + code)
          );
        })
      );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    
    if (this.queryCacheRegion.has(region)) {
      console.log('Cache hit for capital:', region);
      return of(this.queryCacheRegion.get(region)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).
      pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError(err => {
          console.error('CountryService.searchByRegion():');
          return throwError(
            () => new Error('Error al buscar países por region con query: ' + region)
          );
        })
      );
  }

}
 