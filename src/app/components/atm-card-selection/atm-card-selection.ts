import { Component } from '@angular/core';
import { CUSTOMERS } from '../../models/data/customers.mock';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-atm-card-selection',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './atm-card-selection.html',
  styleUrl: './atm-card-selection.scss',
})
export class AtmCardSelection {
  public readonly customers = CUSTOMERS;
}
