import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Card } from '../../../models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '@models/customer.js';
import { ICustomer } from '@models/index'

export function isMultiple(num: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    return value % num === 0 ? null : { isMultiple: { value: control.value } };
  };
}

@Component({
  selector: 'app-atm-action-menu',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
],
  templateUrl: './action-menu.html',
  styleUrl: './action-menu.scss',
})
export class AtmActionMenu {
  private readonly _snackBar = inject(MatSnackBar);
  public readonly currentCard = input.required<Card>();
  public readonly currentCustomer = input.required<Customer>();

  public readonly withdrawal = new FormControl(null, [
    Validators.required,
    Validators.min(5),
    isMultiple(5),
  ]);

  public readonly deposit = new FormControl(null, [
    Validators.required,
    Validators.min(5),
    isMultiple(5),
  ]);

  private withdrawalMaxValidationRef?: ValidatorFn;

  constructor() {
    effect(() => {
      this.updateValidatorMaximum();
    });
  }

  public handleDeposit(): void {
    this.currentCard().deposit(this.deposit.value!);
    this.deposit.reset();
    const cardIndex = this.currentCustomer().cards.findIndex(card => card.cardNumber === this.currentCard().cardNumber)

    const localCustomers: ICustomer[] = JSON.parse(localStorage['customers'])

    const storedCustomer = localCustomers.find(customer => customer.uuid === this.currentCustomer().uuid)

    console.log(storedCustomer)

    if (!storedCustomer) return

    const targetIndex = localCustomers.indexOf(storedCustomer)

    storedCustomer.cards[cardIndex].balance = this.currentCard().balance

    localCustomers[targetIndex] = storedCustomer

    localStorage['customers'] = JSON.stringify(localCustomers)

    this._snackBar.open('Le dépôt est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
    this.updateValidatorMaximum();
  }

  public handleWithdrawl(): void {
    this.currentCard().withdrawal(this.withdrawal.value!);
    this.withdrawal.reset();

    this._snackBar.open('Le retrait est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
    this.updateValidatorMaximum();
  }

  private updateValidatorMaximum(): void {
    if (this.withdrawalMaxValidationRef) {
      this.withdrawal.removeValidators(this.withdrawalMaxValidationRef);
    }

    this.withdrawalMaxValidationRef = Validators.max(this.currentCard().balance);

    this.withdrawal.addValidators(this.withdrawalMaxValidationRef);
    this.withdrawal.updateValueAndValidity();
  }

  public whenQuit = output<void>();

  public quitScreen(): void {
    this.whenQuit.emit();
  }
}
