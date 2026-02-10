import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Card } from '../../models/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atm-actions-menu',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './atm-actions-menu.html',
  styleUrl: './atm-actions-menu.scss',
})
export class AtmActionsMenu {
  private readonly _snackBar = inject(MatSnackBar);
  public readonly currentCard = input.required<Card>();

  public readonly withdrawal = new FormControl(null, [Validators.required, Validators.min(5)]);
  public readonly deposit = new FormControl(null, [Validators.required, Validators.min(5)]);

  public handleDeposit(): void {
    this.currentCard().deposit(this.deposit.value!);
    this.deposit.reset();

    this._snackBar.open('Le dépot est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
  }
}
