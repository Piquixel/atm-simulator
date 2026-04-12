// Imports
import { Component, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { CardType } from 'models/enums/card-type.enum';
import { IOptionsModel } from 'models/index';
import { BankType } from 'models/enums/bank-type.enum';
import { Customer } from 'models/customer';
import { Card } from 'models/card';
import { MatCardModule } from '@angular/material/card';

// Main Component
@Component({
  selector: 'app-card-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelectModule, MatButtonModule, MatDividerModule, MatCardModule],
  templateUrl: './card-form.html',
  styleUrl: './card-form.scss'
})
export class CardForm {
  constructor() {
    // Format card number on type
    this.cardForm.controls.cardNumber.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.formatCardNumber(value || ''))
  }

  // Inputs
  public readonly currentCustomer = input.required<Customer>()
  public readonly customersList = input.required<Customer[]>()

  // Outputs
  public submitCard = output<Customer[]>()
  public cancelCard = output()

  // Select Models
    // Card Types
  public readonly cardTypes: IOptionsModel[] = [
    {
      label: 'Mastercard',
      value: CardType.MASTERCARD
    },
    {
      label: 'Maestro',
      value: CardType.MAESTRO
    },
    {
      label: 'Cirrus',
      value: CardType.CIRRUS
    },
    {
      label: 'Visa',
      value: CardType.VISA
    },
    {
      label: 'Autre',
      value: CardType.OTHER
    }
  ]

    // Bank Types
  public readonly bankTypes: IOptionsModel[] = [
    {
      label: 'Belfius',
      value: BankType.BELFIUS
    },
    {
      label: 'ING',
      value: BankType.ING
    },
    {
      label: 'Revolut',
      value: BankType.REVOLUT
    },
    {
      label: 'Beobank',
      value: BankType.BEOBANK
    },
    {
      label: 'BNP Paribas Fortis',
      value: BankType.BNP
    }
  ]

  // FormControls
  public cardForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.minLength(19)]),
    cardType: new FormControl(null, [Validators.required]),
    bankType: new FormControl(null, [Validators.required]),
    cardPin: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{4}/g)])
  })

  // Methods
  public leaveForm(): void {
    this.cancelCard.emit();
  }
  public addCard(): void {
    const newCard = new Card(
      this.cardForm.value.cardNumber!,
      this.cardForm.value.cardType!,
      this.cardForm.value.bankType!,
      this.cardForm.value.cardPin!,
      0,
    )

    this.currentCustomer().addCard(newCard)
    const currentUserIndex: number = this.currentCustomer().getIndex(this.customersList())
    this.customersList()[currentUserIndex] = this.currentCustomer()

    this.submitCard.emit(this.customersList())
  }

  private formatCardNumber(nb: string): void {
    // removes any non-digit characters from the initial value
    let result: string = nb.replace(/\D/g, '')

    if (result.length > 0) {
      // sparate string into arrays of 4 digits
      const parts = result.match(/.{1,4}/g)
      // if parts isn't null, affect the joined array to the result
      result = parts ? parts.join('-') : ''
    }
    this.cardForm.controls.cardNumber.setValue(result, {emitEvent: false})
  }

  public getLogo(type: BankType | CardType | null): string {
    if (type === CardType.OTHER || type === null) return ''
    return `/logos/${type.toLowerCase()}.png`
  }

  public obfuscateCardNbr(cardNbr: string | null): string {
    if (cardNbr === null) return ''
    const nbrParts = cardNbr.split('-');

    for (let i = 0; i < nbrParts.length - 1; i++) {
      nbrParts[i] = '*'.repeat(4);
    }

    return nbrParts.join('-');
  }
}
