import { Component, output } from '@angular/core';
import { CUSTOMERS } from '@models/data/customers.mock';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '@models/card';

@Component({
  selector: 'app-atm-card-selection',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card-selection.html',
  styleUrl: './card-selection.scss',
})
export class AtmCardSelection {
  public readonly customers = CUSTOMERS;

  public readonly whenChooseCard = output<Card>();

  public chooseCard(card: Card): void {
    this.whenChooseCard.emit(card);
  }
}
