import { Card } from './card';
import { Gender } from './enums/gender.enum';

export class Customer {
  constructor(
    private readonly _birthdate: Date,
    private _firstname: string,
    private _lastname: string,
    private _gender: Gender,
    private _address: string,
    private _cards: Card[],
  ) {}

  public get fullname(): string {
    return `${this._lastname.toUpperCase()} ${this._firstname}`;
  }

  public get cards(): Card[] {
    return this._cards;
  }
}
