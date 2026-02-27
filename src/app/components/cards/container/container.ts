import { Component, inject } from '@angular/core';
import { CardStep } from '@models/enums/card-step.enum.js';
import { CardsLanding } from '../landing/landing.js';
import { CustomerForm } from "../customer-form/customer-form";
import { Customer } from '@models/customer';
import { CardForm } from '../card-form/card-form.js';
import { CustomerService } from '../../../customer.service.js';

@Component({
  selector: 'app-cards-container',
  imports: [CardsLanding, CustomerForm, CardForm],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class CardsContainer {
  private customerService = inject(CustomerService)

  public customers = this.customerService.customers
  public readonly cardStep: typeof CardStep = CardStep;
  public currentStep: CardStep = this.cardStep.LANDING;
  public currentCustomer?: Customer
  public changeStep(step: CardStep, customer?: Customer) {
    this.currentStep = step
    this.currentCustomer = customer
  }

  public updateCustomerList(customers: Customer[]): void {
    this.customerService.save(customers)
    this.changeStep(this.cardStep.LANDING)
  }

  public handleCustomerUpdate(customers: Customer[]): void {
    this.customerService.save(customers)
  }
}
