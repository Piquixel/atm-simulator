import { Component } from '@angular/core';
import { CardStep } from '@models/enums/card-step.enum.js';
import { CardsLanding } from '../landing/landing.js';
import { CustomerForm } from "../customer-form/customer-form";
import { ICustomer } from '@models/index';

@Component({
  selector: 'app-cards-container',
  imports: [CardsLanding, CustomerForm],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class CardsContainer {
  public customers: ICustomer[] = localStorage['customers'] || []

  public readonly cardStep: typeof CardStep = CardStep;
  public currentStep: CardStep = this.cardStep.LANDING;
  public errMsg?: string;
  public changeStep(step: CardStep) {
    this.currentStep = step
  }
}
