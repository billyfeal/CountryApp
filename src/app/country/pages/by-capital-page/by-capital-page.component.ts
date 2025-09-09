import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  query = signal('');

  countryResourse = resource({
    request: () => ({ query: this.query() }),
    loader: async({request}) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query)
      );
    } 
  });
}