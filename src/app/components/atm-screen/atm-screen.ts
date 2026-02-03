import { Component } from '@angular/core';
import { PinPad } from '../pin-pad/pin-pad';
import { AtmActionsMenu } from '../atm-actions-menu/atm-actions-menu';
import { AtmCardSelection } from '../atm-card-selection/atm-card-selection';
import { AtmLanding } from '../atm-landing/atm-landing';
import { AtmStep } from '../../models/enums/atm-step.enum';
import { Card } from '../../models/card';
import { CUSTOMERS } from '../../models/data/customers.mock';

@Component({
  selector: 'app-atm-screen',
  imports: [PinPad, AtmActionsMenu, AtmCardSelection, AtmLanding],
  templateUrl: './atm-screen.html',
  styleUrl: './atm-screen.scss',
})
export class AtmScreen {
  public readonly AtmStep = AtmStep;

  public currentStep = AtmStep.LANDING;
  public selectedCard?: Card;
  public erroMessage?: string;

  public changeStep(step: AtmStep): void {
    this.currentStep = step;
  }

  public handleSelectCard(card: Card) {
    this.selectedCard = card;
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
