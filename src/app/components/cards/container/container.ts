import { Component } from '@angular/core';
import { CardStep } from '@models/enums/card-step.enum.js';
import { CardsLanding } from '../landing/landing.js';
import { CustomerForm } from "../customer-form/customer-form";
import { Customer } from '@models/customer';
import { ICustomer } from '@models/index';
import { CardForm } from '../card-form/card-form.js';
import { Card } from '@models/card.js';

@Component({
  selector: 'app-cards-container',
  imports: [CardsLanding, CustomerForm, CardForm],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class CardsContainer {
  public readonly storedCustomers: ICustomer[] = JSON.parse(localStorage['customers'] || '[]')
  public customers = this.storedCustomers.map(c => {
    const cards = c.cards.map(card => new Card(card.cardNumber, card.cardType, card.bankType, card.cardPin, card.balance))
    return new Customer(c.uuid,c.birthDate, c.firstName, c.lastName, c.gender, c.address, cards)
  })
  public readonly cardStep: typeof CardStep = CardStep;
  public currentStep: CardStep = this.cardStep.LANDING;
  public currentCustomer?: Customer = undefined
  public errMsg?: string;
  public changeStep(step: CardStep, customer?: Customer) {
    this.currentStep = step
    if (customer) {
      this.currentCustomer = customer
      console.log(this.currentCustomer)
    } else {
      this.currentCustomer = undefined
      console.log(this.currentCustomer)
    }
  }
}
