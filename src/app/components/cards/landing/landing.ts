import { Component, input, output } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { ICustomer } from '@models/index.js';

@Component({
  selector: 'app-cards-landing',
  imports: [ MatButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class CardsLanding {
  public customersList = input<ICustomer[]>([])
  public whenNext = output<void>();

  public nextStep(): void {
    this.whenNext.emit()
  }
}
