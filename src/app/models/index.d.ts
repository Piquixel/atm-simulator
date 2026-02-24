import { BankType } from './enums/bank-type.enum.js';
import { CardType } from './enums/card-type.enum.js';
import { Gender } from './enums/gender.enum.js';

export interface ICustomer {
  _uuid: string
  _birthdate: Date
  _firstname: string
  _lastname: string
  _gender: Gender
  _address: string
  _cards: ICard[]
}

export interface ICard {
  _cardNumber: string
  _type: CardType
  _bank: BankType
  _pin: string,
  _balance: number
}

export interface IOptionsModel {
  label: string
  value: string
}
