import { Component } from '@angular/core';
import { Pad } from '../pad/pad';
import { AtmActionMenu } from '../action-menu/action-menu';
import { AtmCardSelection } from '../card-selection/card-selection';
import { AtmLanding } from '../landing/landing';
import { AtmStep } from '@models/enums/atm-step.enum';
import { Card } from '@models/card';
import { Customer } from '@models/customer.js';
import { ICustomer } from '@models/index.js';

@Component({
  selector: 'app-atm-container',
  imports: [Pad, AtmActionMenu, AtmCardSelection, AtmLanding],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class AtmComponent {
  public readonly AtmStep = AtmStep;

  public currentStep = AtmStep.LANDING;
  public selectedCard?: Card;
  public erroMessage?: string;

  public readonly storedCustomers: ICustomer[] = JSON.parse(localStorage['customers'] || '[]')

  public customers = this.storedCustomers.map(c => {
      const cards = c.cards.map(card => new Card(card.cardNumber, card.cardType, card.bankType, card.cardPin, card.balance))
      return new Customer(c.uuid,c.birthDate, c.firstName, c.lastName, c.gender, c.address, cards)
  })

  public currentCustomer?: Customer

  public changeStep(step: AtmStep): void {
    this.currentStep = step;
  }

  public handleSelectCard(card: Card) {
    this.selectedCard = card;
    this.currentCustomer = this.customers.find(cus => cus.cards.find(c => c.cardNumber === card.cardNumber))
    this.changeStep(AtmStep.PIN_PAD);
  }

  public handlePin(pin: string): void {
    if (this.selectedCard && this.selectedCard.checkPin(pin)) {
      this.changeStep(AtmStep.ACTIONS_MENU);
      this.erroMessage = '';
    } else {
      this.erroMessage = 'Attention, votre pin est incorrect';
    }
  }
}
