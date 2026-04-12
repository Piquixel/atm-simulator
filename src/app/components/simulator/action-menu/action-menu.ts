// Imports
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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { Card } from 'models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'models/customer';
import { BankType } from 'models/enums/bank-type.enum';
import { CardType } from 'models/enums/card-type.enum';

// Local Validator, check if control value is multiple of num
export function isMultiple(num: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    return value % num === 0 ? null : { isMultiple: { value: control.value } };
  };
}

// Main Component
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
    MatTabsModule,
    MatCardModule
],
  templateUrl: './action-menu.html',
  styleUrl: './action-menu.scss',
})
export class AtmActionMenu {
  constructor() {
    effect(() => {
      this.updateValidatorMaximum();
    });
  }

  // Injects
  private readonly _snackBar = inject(MatSnackBar);

  // Inputs
  public readonly currentCard = input.required<Card>();
  public readonly currentCustomer = input.required<Customer>();
  public readonly customersList = input.required<Customer[]>();

  // Outputs
  public customersUpdate = output<Customer[]>()
  public leftMenu = output<void>();

  // Properties
  public readonly presets = [20, 50, 100, 200, 300, 500];
  private _withdrawalMaxValidationRef?: ValidatorFn;

  // FormControls
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

  // Methods
  private showSnack(message: string, duration = 2500): void {
    this._snackBar.open(message, '', {
      duration
    })
  }
  private saveData(): void {
    const cardIndex = this.currentCustomer().cards.findIndex(card => card.cardNumber === this.currentCard().cardNumber)

    const targetIndex = this.customersList().indexOf(this.currentCustomer())

    this.currentCustomer().cards[cardIndex] = this.currentCard()

    this.customersList()[targetIndex] = this.currentCustomer()

    this.customersUpdate.emit(this.customersList())
  }

  public resetField(field: FormControl): void {
    field.reset()
  }

  public handleDeposit(): void {
    this.currentCard().deposit(this.deposit.value!);
    this.resetField(this.deposit)

    this.saveData()

    this.showSnack('Le dépôt a bien été validé!')
    this.updateValidatorMaximum();
  }

  public handleWithdrawl(): void {
    this.currentCard().withdrawal(this.withdrawal.value!);
    this.resetField(this.withdrawal)

    this.saveData()

    this.showSnack('Le retrait a bien été validé!')
    this.updateValidatorMaximum();
  }

  public applyPreset(amount: number): void {
    this.withdrawal.setValue(amount)
    this.deposit.setValue(amount)
  }

  private updateValidatorMaximum(): void {
    if (this._withdrawalMaxValidationRef) {
      this.withdrawal.removeValidators(this._withdrawalMaxValidationRef);
    }

    this._withdrawalMaxValidationRef = Validators.max(this.currentCard().balance);

    this.withdrawal.addValidators(this._withdrawalMaxValidationRef);
    this.withdrawal.updateValueAndValidity();
  }

  public leaveMenu(): void {
    this.leftMenu.emit();
  }

  public getLogo(type: BankType | CardType): string {
    if (type === CardType.OTHER) return ''
    return `/logos/${type.toLowerCase()}.png`
  }

  public obfuscateCardNbr(nbr: string): string {
    const cardNbrParts = nbr.split('-')

    for (let i = 0; i < cardNbrParts.length - 1; i++) {
      cardNbrParts[i] = '*'.repeat(4)
    }

    return cardNbrParts.join('-')
  }
}
