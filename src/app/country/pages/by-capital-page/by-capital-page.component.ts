import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  query = signal('');
  countryResourse = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if (!request.query) return of([]);

      return this.countryService.searchByCapital(request.query);
    },
  });


  // countryResourse = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if (!request.query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   } 
  // });
}