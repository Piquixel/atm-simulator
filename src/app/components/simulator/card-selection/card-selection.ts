import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '@models/card';
import { Customer } from '@models/customer.js';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-atm-card-selection',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatDividerModule, MatExpansionModule, RouterLink],
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
