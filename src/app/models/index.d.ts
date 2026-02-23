import { BankType } from './enums/bank-type.enum.js';
import { CardType } from './enums/card-type.enum.js';
import { Gender } from './enums/gender.enum.js';

export interface ICustomer {
  uuid: string
  birthDate: Date
  firstName: string
  lastName: string
  gender: Gender
  address: string
  cards: ICard[]
}

export interface ICard {
  cardNumber: string
  cardType: CardType
  bankType: BankType
  cardPin: string,
  balance: number
}

export interface IOptionsModel {
  label: string
  value: string
}
