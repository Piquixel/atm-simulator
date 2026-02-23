import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from "@angular/material/button";
import { CardType } from '@models/enums/card-type.enum.js';
import { ICard, ICustomer, IOptionsModel } from '@models/index.js';
import { BankType } from '@models/enums/bank-type.enum.js';
import { Card } from '@models/card.js';
import { Customer } from '@models/customer.js';

@Component({
  selector: 'app-card-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatSelectModule, MatButtonModule],
  templateUrl: './card-form.html',
  styleUrl: './card-form.scss',
})
export class CardForm {
  public currentCustomer = input.required<Customer>()
  public customerList = input.required<ICustomer[]>()
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
    cardPin: new FormControl('', [Validators.required])
  })

  public toLanding = output()

  public returnToLanding = (): void => this.toLanding.emit()
  public addCard() {
    const newCard: ICard = {
      balance: 0,
      bankType: this.cardForm.controls.bankType.value!,
      cardNumber: this.cardForm.controls.cardNumber.value!,
      cardPin: this.cardForm.controls.cardPin.value!,
      cardType: this.cardForm.controls.cardType.value!
    }
    const cardClass = new Card(
      newCard.cardNumber,
      newCard.cardType,
      newCard.bankType,
      newCard.cardPin,
      newCard.balance,
    )

    this.currentCustomer().cards = cardClass
    const targetIndex = this.customerList().findIndex(customer => customer.uuid === this.currentCustomer().uuid)
    this.customerList()[targetIndex].cards.push(newCard)
    localStorage['customers'] = JSON.stringify(this.customerList())
    this.toLanding.emit()
  }

  public cardNumberModel = ''

  public formatCardNumber(nb: string): void {
    let res = nb.split('-').join()
    if (res.length > 0)
      res = res.match(new RegExp('[0-9]{1,4}', 'g'))!.join('-')
    this.cardNumberModel = res
  }
}
