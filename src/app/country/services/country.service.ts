import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { RESTCountry } from '../interfaces/rest-country.interface';


const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    const searchQuery = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${searchQuery}`).
      pipe(
        map(countries => CountryMapper.mapRestCountryArrayToCountryArray(countries)),
        catchError(err => {
          console.error('CountryService.searchByCapital():');
          return throwError(
            () => new Error('Error al buscar países por capital con query: ' + searchQuery)
          );
        })
      );
  }
}
 