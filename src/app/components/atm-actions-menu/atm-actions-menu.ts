import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Card } from '../../models/card';

@Component({
  selector: 'app-atm-actions-menu',
  imports: [MatButtonModule, MatExpansionModule, MatIconModule, CurrencyPipe],
  templateUrl: './atm-actions-menu.html',
  styleUrl: './atm-actions-menu.scss',
})
export class AtmActionsMenu {
  public readonly currentCard = input.required<Card>();
  public readonly now = new Date();
}
