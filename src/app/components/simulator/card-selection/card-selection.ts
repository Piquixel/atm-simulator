import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '@models/card';
import { Customer } from '@models/customer.js';

@Component({
  selector: 'app-atm-card-selection',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card-selection.html',
  styleUrl: './card-selection.scss',
})
export class AtmCardSelection {
  public readonly customers = input.required<Customer[]>()

  public readonly whenChooseCard = output<Card>();

  public chooseCard(card: Card): void {
    this.whenChooseCard.emit(card);
  }
}
