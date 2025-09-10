import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-content',
  imports: [DecimalPipe],
  templateUrl: './country-content.component.html',
})
export class CountryContentComponent {
  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear()});
 }
