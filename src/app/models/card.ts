import { BankType } from './enums/bank-type.enum';
import { CardType } from './enums/card-type.enum';

export class Card {
  constructor(
    private readonly cardNumber: string,
    private readonly type: CardType,
    private readonly bank: BankType,
    private pin: string,
    private balance: number,
  ) {}
}
