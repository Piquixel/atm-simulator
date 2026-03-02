import { Customer } from './customer.js';
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

  public set pin(pin: string) {
    if (/[0-9]{4}/.test(pin))
      this._pin = pin
    else throw new Error('Le format de PIN entré est incorrect!')
  }

  public checkPin = (pin: string): boolean => this._pin === pin;

  public deposit(amount: number): void {
    if (amount > 0) {
      this._balance += amount;
    } else {
      throw new Error('Le montant doit être positif pour faire un dépôt');
    }
  }

  public withdrawal(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this._balance -= amount;
    } else {
      throw new Error('Le montant doit être positif et supérieur pour faire un retrait');
    }
  }

  public getIndexes(customerList: Customer[]): number[] {
    const ownerIndex: number = customerList.findIndex(customer => customer.cards.find(card => card === this))
    const cardList = customerList[ownerIndex].cards

    return [
      ownerIndex, cardList.indexOf(this)
      ]
  }
}
