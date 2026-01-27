import { Component } from '@angular/core';
import { PinPad } from '../pin-pad/pin-pad';
import { AtmActionsMenu } from '../atm-actions-menu/atm-actions-menu';
import { AtmCardSelection } from '../atm-card-selection/atm-card-selection';
import { AtmLanding } from '../atm-landing/atm-landing';
import { AtmStep } from '../../models/enums/atm-step.enum';

@Component({
  selector: 'app-atm-screen',
  imports: [PinPad, AtmActionsMenu, AtmCardSelection, AtmLanding],
  templateUrl: './atm-screen.html',
  styleUrl: './atm-screen.scss',
})
export class AtmScreen {
  public readonly AtmStep = AtmStep;
  public currentStep = AtmStep.LANDING;

  public changeStep(step: AtmStep): void {
    this.currentStep = step;
  }
}
