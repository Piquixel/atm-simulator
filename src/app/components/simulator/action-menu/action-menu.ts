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
import { Card } from '@models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from '@models/customer.js';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

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
    MatGridListModule,
    MatDividerModule,
    MatTabsModule
],
  templateUrl: './action-menu.html',
  styleUrl: './action-menu.scss',
})
export class AtmActionMenu {
  private readonly _snackBar = inject(MatSnackBar);
  public readonly customersList = input.required<Customer[]>();
  public readonly currentCard = input.required<Card>();
  public readonly currentCustomer = input.required<Customer>();

  public readonly presets = [20, 50, 100, 200, 300, 500]

  public readonly withdrawal = new FormControl<number|null>(null, [
    Validators.required,
    Validators.min(5),
    isMultiple(5),
  ]);

  public readonly deposit = new FormControl<number|null>(null, [
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

  public saveCustomers = output<Customer[]>()

  private saveData(): void {
    const cardIndex = this.currentCustomer().cards.findIndex(card => card.cardNumber === this.currentCard().cardNumber)

    const targetIndex = this.customersList().indexOf(this.currentCustomer())

    this.currentCustomer().cards[cardIndex] = this.currentCard()

    this.customersList()[targetIndex] = this.currentCustomer()

    this.saveCustomers.emit(this.customersList())
  }

  public handleDeposit(): void {
    this.currentCard().deposit(this.deposit.value!);
    this.deposit.reset();

    this.saveData()

    this._snackBar.open('Le dépôt est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
    this.updateValidatorMaximum();
  }

  public handleWithdrawl(): void {
    this.currentCard().withdrawal(this.withdrawal.value!);
    this.withdrawal.reset();

    this.saveData()

    this._snackBar.open('Le retrait est bien validé !', '', {
      verticalPosition: 'top',
      duration: 2000,
    });
    this.updateValidatorMaximum();
  }

  public applyPreset(amount: number): void {
    this.withdrawal.setValue(amount)
    this.deposit.setValue(amount)
  }

  public resetField(field: FormControl): void {
    field.reset()
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
