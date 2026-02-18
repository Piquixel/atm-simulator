import { Component } from '@angular/core';
import { CardStep } from '@models/enums/card-step.enum.js';
import { CardsLanding } from '../landing/landing.js';

@Component({
  selector: 'app-cards-container',
  imports: [CardsLanding],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})
export class CardsContainer {
  public customers?: object[] = localStorage['customers']
  public readonly cardStep: typeof CardStep = CardStep;
  private _currentStep: CardStep = this.cardStep.LANDING;
  public errMsg?: string;
  get currentStep(): CardStep {
    return this._currentStep
  }
  set currentStep(step: CardStep) {
    this._currentStep = step
  }
}
