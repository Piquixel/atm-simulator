import { BankType } from 'enums/bank-type.enum';
import { CardType } from 'enums/card-type.enum';

export interface ICard {
  _cardNumber: string;
  _type: CardType;
  _bank: BankType;
  _pin: string;
  _balance: number;
}
