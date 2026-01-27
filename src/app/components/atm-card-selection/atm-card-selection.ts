import { Component } from '@angular/core';
import { CUSTOMERS } from '../../models/data/customers.mock';

@Component({
  selector: 'app-atm-card-selection',
  imports: [],
  templateUrl: './atm-card-selection.html',
  styleUrl: './atm-card-selection.scss',
})
export class AtmCardSelection {
  public readonly customers = CUSTOMERS;
}
