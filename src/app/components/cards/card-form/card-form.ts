import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { CardType } from '@models/enums/card-type.enum';
import { IOptionsModel } from '@models/index';
import { BankType } from '@models/enums/bank-type.enum';
import { Card } from '@models/card';
import { Customer } from '@models/customer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelectModule, MatButtonModule],
  templateUrl: './card-form.html',
  styleUrl: './card-form.scss',
})
export class CardForm {
  public currentCustomer = input.required<Customer>()
  public customerList = input.required<Customer[]>()
  public readonly cardTypes: IOptionsModel[] = [
    {
      label: 'Mastercard',
      value: CardType.MASTERCARD
    },{
      label: 'Visa',
      value: CardType.VISA
    },{
      label: 'Autre',
      value: CardType.OTHER
    }
  ]

  public readonly bankTypes: IOptionsModel[] = [
    {
      label: 'Belfius',
      value: BankType.BELFIUS
    },{
      label: 'ING',
      value: BankType.ING
    },{
      label: 'Revolut',
      value: BankType.REVOLUT
    }
  ]

  public cardForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    cardType: new FormControl(null, [Validators.required]),
    bankType: new FormControl(null, [Validators.required]),
    cardPin: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{4}$')])
  })

  public onSubmit = output<Customer[]>()
  public onReset = output()

  public returnToLanding = (): void => this.onReset.emit()
  public addCard() {
    const newCard = new Card(
      this.cardForm.controls.cardNumber.value!,
      this.cardForm.controls.cardType.value!,
      this.cardForm.controls.bankType.value!,
      this.cardForm.controls.cardPin.value!,
      0,
    )

    this.currentCustomer().cards = newCard
    const targetIndex = this.customerList().findIndex(c => c.uuid === this.currentCustomer().uuid)
    this.customerList()[targetIndex] = this.currentCustomer()

    this.onSubmit.emit(this.customerList())
  }

  constructor() {
    this.cardForm.controls.cardNumber.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.formatCardNumber(value || ''))
  }

  private formatCardNumber(nb: string): void {
    let res = nb.replace(/\D/g, '')
    if (res.length > 0) {
      const parts = res.match(/.{1,4}/g)
      res = parts ? parts.join('-') : ''
    }
    this.cardForm.controls.cardNumber.setValue(res, {emitEvent: false})
  }
}
