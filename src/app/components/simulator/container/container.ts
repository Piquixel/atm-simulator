// Imports
import { Component, inject } from '@angular/core';
import { Pad } from '../pad/pad';
import { AtmActionMenu } from '../action-menu/action-menu';
import { AtmCardSelection } from '../card-selection/card-selection';
import { AtmLanding } from '../landing/landing';
import { AtmStep } from 'models/enums/atm-step.enum';
import { Card } from 'models/card';
import { Customer } from 'models/customer';
import { CustomerService } from 'services/customer.service';

// Main Component
@Component({
  selector: 'app-atm-container',
  imports: [Pad, AtmActionMenu, AtmCardSelection, AtmLanding],
  templateUrl: './container.html',
})
export class AtmComponent {
  // Injects
  private readonly _customerService: CustomerService = inject(CustomerService)

  // Properties
  public readonly atmStep: typeof AtmStep = AtmStep;
  public currentStep: AtmStep = this.atmStep.LANDING;
  public customers = this._customerService.customers
  public currentCustomer?: Customer
  public selectedCard?: Card;
  public erroMessage?: string;

  // Methods
  public changeStep(step: AtmStep): void {
    this.currentStep = step;
  }

  public handleSelectCard(card: Card) {
    this.selectedCard = card;
    this.currentCustomer = this.customers().find(cus => cus.cards.find(c => c.cardNumber === card.cardNumber))
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

  public handleCustomersUpdate(customers: Customer[]): void {
    this._customerService.save(customers)
  }
}
