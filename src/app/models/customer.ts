import { Card } from "./card";
import { Gender } from "./enums/gender.enum";

export class Customer {
  constructor(
    private firstname: string,
    private lastname: string,
    private gender: Gender,
    private birthdate: Date,
    private address: string,
    private cards: Card[]
  ) {}
}
