import { BankType } from './enums/bank-type.enum';
import { CardType } from './enums/card-type.enum';

export class Card {
  constructor(
    private readonly _cardNumber: string,
    private readonly _type: CardType,
    private readonly _bank: BankType,
    private _pin: string,
    private _balance: number,
  ) {}

  public get cardNumber(): string {
    return this._cardNumber;
  }

  public get type(): CardType {
    return this._type;
  }

  public get bank(): BankType {
    return this._bank;
  }

  public get balance(): number {
    return this._balance;
  }

  public checkPin(pin: string): boolean {
    return this._pin === pin;
  }
}
