// Imports
import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from "@angular/router";
import { Card } from 'models/card';
import { Customer } from 'models/customer';
import { BankType } from 'models/enums/bank-type.enum';
import { CardType } from 'models/enums/card-type.enum';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

// Main Component
@Component({
  selector: 'app-atm-card-selection',
  imports: [MatCardModule, MatButtonModule, MatListModule, MatDividerModule, MatExpansionModule, RouterLink, MatStepperModule, MatIconModule],
  templateUrl: './card-selection.html',
  styleUrl: './card-selection.scss',
})
export class AtmCardSelection {
  // Inputs
  public readonly customers = input.required<Customer[]>()

  // Outputs
  public readonly cardChosen = output<Card>();

  // Methods
  public chooseCard(card: Card): void {
    this.cardChosen.emit(card);
  }

  public getLogo(type: CardType | BankType): string {
    if (type === CardType.OTHER) return ''
    return `/logos/${type.toLowerCase()}.png`
  }

  public obfuscateCardNbr(nbr: string): string {
    const cardNbrParts = nbr.split('-')

    for (let i = 0; i < cardNbrParts.length - 1; i++) {
      cardNbrParts[i] = '*'.repeat(4)
    }

    return cardNbrParts.join('-')
  }

  public isFirstCustomer(customer: Customer): boolean {
    return this.customers().indexOf(customer) === 0
  }
}
