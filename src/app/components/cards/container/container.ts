// Imports
import { Component, inject, Signal } from '@angular/core';
import { CardStep } from '@models/enums/card-step.enum';
import { CardsLanding } from '../landing/landing';
import { CustomerForm } from "../customer-form/customer-form";
import { Customer } from '@models/customer';
import { CardForm } from '../card-form/card-form';
import { CustomerService } from '@services/customer.service';

// Main Component
@Component({
  selector: 'app-cards-container',
  imports: [CardsLanding, CustomerForm, CardForm],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class CardsContainer {
  // Injects
  private customerService = inject(CustomerService)

  // Properties
  public readonly customers: Signal<Customer[]> = this.customerService.customers
  public readonly cardStep: typeof CardStep = CardStep;
  public currentStep: CardStep = this.cardStep.LANDING;
  public currentCustomer?: Customer

  // Methods
  public changeStep(step: CardStep, customer?: Customer): void {
    this.currentStep = step
    this.currentCustomer = customer
  }

  public handleCustomersUpdate(customers: Customer[], redirect = true): void {
    this.customerService.save(customers)
    if (redirect) this.changeStep(this.cardStep.LANDING)
  }
}
